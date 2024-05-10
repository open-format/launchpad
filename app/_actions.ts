"use server";

import { appFactoryAbi } from "@/abis/AppFactory";
import { tokenFactoryAbi } from "@/abis/ERC20FactoryFacet";
import { contractAddresses } from "@/lib/constants";
import { encrypt } from "@/lib/encryption";
import createSupabaseServerClient from "@/lib/supabase/server";
import { handleTransaction } from "@/lib/transactions";
import { getAccountClient } from "@/lib/viem/config";
import { ethers } from "ethers";
import { gql, request } from "graphql-request";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { parseEther, stringToHex } from "viem";

// @TODO: Implement magic link
export async function signInWithOtp({ email }: { email: string }) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithOtp({
    email: email,
  });
  return JSON.stringify(result);
}

export async function createWeb3Account(
  password: string
): Promise<KeyState> {
  const wallet = ethers.Wallet.createRandom();
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const keystoreJson = await wallet.encrypt(password);

  if (!user) {
    throw new Error("Account not found, please try again.");
  }

  if (!wallet.mnemonic) {
    throw new Error("Recovery phrase generation failed.");
  }

  await supabase
    .from("wallet")
    .upsert({
      id: user.id,
      address: wallet.address,
      keystore: keystoreJson,
    })
    .select();

  if (
    process.env.ACCOUNT_BALANCE_SERVICE_URL &&
    process.env.ACCOUNT_BALANCE_SERVICE_AUTH_TOKEN
  ) {
    await fetch(process.env.ACCOUNT_BALANCE_SERVICE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCOUNT_BALANCE_SERVICE_AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        user_address: wallet.address,
        amount: process.env.ACCOUNT_BALANCE_AMOUNT ?? 0.2,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }

  return {
    address: wallet.address,
    encryptedAccountKey: encrypt(
      wallet.privateKey,
      process.env.SECRET_KEY!
    ),
    privateKey: wallet.privateKey,
    recoveryPhrase: wallet.mnemonic?.phrase,
  };
}

export async function getAccountAddress(): Promise<
  ActionResponse<AddressResponse>
> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const wallet = await supabase
      .from("wallet")
      .select()
      .eq("id", user.id)
      .maybeSingle();

    if (!wallet.data) {
      throw new Error("Account not found, please try again.");
    }

    return { data: { address: wallet.data.address } };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function revealAccountKey(
  password: string
): Promise<ActionResponse<AccountKeyResponse>> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const wallet = await supabase
      .from("wallet")
      .select()
      .eq("id", user.id)
      .maybeSingle();

    if (!wallet) {
      throw new Error("Account not found, please try again.");
    }

    const decrypted = await ethers.Wallet.fromEncryptedJson(
      wallet.data.keystore,
      password
    );

    if (!decrypted) {
      throw new Error("Error decrypting account, please try again.");
    }

    return {
      data: { accountKey: decrypted.privateKey },
    };
  } catch (error: any) {
    if (
      error.code === "INVALID_ARGUMENT" &&
      error.argument === "password"
    ) {
      throw new Error("Incorrect password, please try again.");
    } else {
      throw new Error(error.message);
    }
  }
}

export async function createAPIKey(password: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const wallet = await supabase
      .from("wallet")
      .select()
      .eq("id", user.id)
      .maybeSingle();

    const decrypted = await ethers.Wallet.fromEncryptedJson(
      wallet.data.keystore,
      password
    );

    const { account, accountClient } = getAccountClient(
      decrypted.privateKey
    );

    const challenge = await fetch(
      "https://api.openformat.tech/key/challenge",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_address: account.address }),
      }
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));

    const signature = await accountClient.signMessage({
      message: challenge.challenge,
    });

    const verify = await fetch(
      "https://api.openformat.tech/key/verify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          public_address: account.address,
          signature: signature,
        }),
      }
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));

    return verify.api_key;
  } catch (error: any) {
    if (
      error.code === "INVALID_ARGUMENT" &&
      error.argument === "password"
    ) {
      throw new Error("Incorrect password, please try again.");
    } else {
      throw new Error(error.message);
    }
  }
}

export async function createApp(name: string, password: string) {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const wallet = await supabase
      .from("wallet")
      .select()
      .eq("id", user.id)
      .maybeSingle();

    if (!wallet) {
      throw new Error("Account not found, please try again.");
    }

    const decrypted = await ethers.Wallet.fromEncryptedJson(
      wallet.data.keystore,
      password
    );

    const appId = await handleTransaction(
      decrypted.privateKey,
      contractAddresses.APP_FACTORY,
      appFactoryAbi,
      "create",
      [stringToHex(name, { size: 32 }), decrypted.address],
      "Created"
    );

    const xpAddress = await handleTransaction(
      decrypted.privateKey,
      appId,
      tokenFactoryAbi,
      "createERC20",
      [
        name,
        "XP",
        18,
        parseEther("0"),
        stringToHex("Base", { size: 32 }),
      ],
      "Created"
    );

    return {
      appId: appId,
      xpAddress: xpAddress,
    };
  } catch (error: any) {
    if (
      error.code === "INVALID_ARGUMENT" &&
      error.argument === "password"
    ) {
      throw new Error("Incorrect password, please try again.");
    } else {
      throw new Error(error.message);
    }
  }
}

export async function getUserApps() {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const wallet = await supabase
      .from("wallet")
      .select()
      .eq("id", user.id)
      .maybeSingle();

    if (!wallet.data) {
      throw new Error("Account not found, please try again.");
    }

    const query = gql`
      query getAppsByUser($user: String!) {
        apps(
          where: { owner_contains_nocase: $user }
          orderBy: createdAt
          orderDirection: desc
        ) {
          id
          name
          createdAt
        }
      }
    `;

    const data = await request<AppData>(
      process.env.SUBGRAPH_URL!,
      query,
      { user: wallet.data.address }
    );

    return data.apps;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getApp(app: string) {
  try {
    const query = gql`
      query getSingleApp($app: ID!) {
        app(id: $app) {
          id
          name
          xpToken {
            id
          }
          badges {
            id
            name
          }
        }
      }
    `;

    const data = await request<{ app: App }>(
      process.env.SUBGRAPH_URL!,
      query,
      { app }
    );

    return data.app;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteAccount() {
  try {
    const supabase = await createSupabaseServerClient(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const { error } = await supabase.auth.admin.deleteUser(user.id);

    if (error) {
      throw new Error(error.message);
    }

    await supabase.auth.signOut();
  } catch (error: any) {
    throw new Error(error.message);
  }

  redirect("/register");
}

export async function addUserToAudience() {
  try {
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    if (!audienceId) {
      return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const supabase = await createSupabaseServerClient();
    const user = await supabase.auth.getUser();

    if (!user || !user?.data?.user?.email) {
      return;
    }

    const result = await resend.contacts.create({
      email: user.data.user?.email,
      firstName: user.data.user?.user_metadata["name"].split(" ")[0],
      unsubscribed: false,
      audienceId,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}
