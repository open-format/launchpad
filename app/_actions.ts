"use server";

import { trackEvent } from "@/lib/analytics";
import createSupabaseServerClient from "@/lib/supabase/server";
import { ethers } from "ethers";
import { gql, request } from "graphql-request";
import { redirect } from "next/navigation";
import { Resend } from "resend";

// @TODO: Implement magic link
export async function signInWithOtp({ email }: { email: string }) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithOtp({
    email: email,
  });
  return JSON.stringify(result);
}

export async function fundAccount(address: string): Promise<boolean> {
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
        user_address: address,
        amount: process.env.ACCOUNT_BALANCE_AMOUNT ?? "0.2",
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }

  await trackEvent({ event_name: "Create web3 Account" });

  return true;
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
    await trackEvent({ event_name: "Reveal Account Key" });

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

export async function generateChallenge(address: string) {
  try {
    const challenge = await fetch(
      "https://api.openformat.tech/key/challenge",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_address: address }),
      }
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));

    // const signature = await accountClient.signMessage({
    //   message: challenge.challenge,
    // });

    // const verify = await fetch(
    //   "https://api.openformat.tech/key/verify",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       public_address: account.address,
    //       signature: signature,
    //     }),
    //   }
    // )
    //   .then((response) => response.json())
    //   .catch((err) => console.error(err));

    // await trackEvent({ event_name: "Generate API Key" });

    return challenge;
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

export async function verifyChallenge(
  address: string,
  signature: string
) {
  try {
    const verify = await fetch(
      "https://api.openformat.tech/key/verify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          public_address: address,
          signature: signature,
        }),
      }
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));

    await trackEvent({ event_name: "Generate API Key" });

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
