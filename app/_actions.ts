"use server";

import { encrypt } from "@/lib/encryption";
import createSupabaseServerClient from "@/lib/supabase/server";
import { getAccountClient } from "@/lib/viem/config";
import { ethers } from "ethers";
import { redirect } from "next/navigation";

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
  } catch (e) {
    // @TODO Add correct error handling
    return e;
  }
}
