"use server";

import { trackEvent } from "@/lib/analytics";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { gql, request } from "graphql-request";

const storage = new ThirdwebStorage({
  secretKey: process.env.THIRDWEB_SECRET, // You can get one from dashboard settings
});

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
      `${process.env.OPENFORMAT_API_URL}/key/challenge`,
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
      `${process.env.OPENFORMAT_API_URL}/key/verify`,
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
            metadataURI
          }
        }
      }
    `;

    const data = await request<{ app: App }>(
      process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
      query,
      { app }
    );

    return data.app;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function uploadFileToIPFS(formData: FormData) {
  const file = formData.get("file") as File;

  // Convert the file to a Buffer
  const buffer = await file.arrayBuffer(); // Convert file to ArrayBuffer
  const fileBuffer = Buffer.from(buffer); // Convert ArrayBuffer to Buffer

  const ipfsHash = await storage.upload(fileBuffer, {
    uploadWithoutDirectory: true,
  });

  return ipfsHash;
}

export async function uploadJSONToIPFS(data: any) {
  const ipfsHash = await storage.upload(data, {
    uploadWithoutDirectory: true,
  });

  return ipfsHash;
}
