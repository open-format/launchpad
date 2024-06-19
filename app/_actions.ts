"use server";

import { trackEvent } from "@/lib/analytics";

import { gql, request } from "graphql-request";

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

  await trackEvent({
    event_name: "User Wallet Funded",
    event_meta: {
      amount_in_eth: process.env.ACCOUNT_BALANCE_AMOUNT!,
    },
  });

  return true;
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
          badges(orderBy: createdAt, orderDirection: desc) {
            id
            name
            createdAt
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
