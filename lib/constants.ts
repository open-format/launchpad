export const URLS = {
  discord: "https://discord.com/invite/WuYmFuqeWf",
  docs: "https://docs.openformat.tech",
};

export const contractAddresses: { [key: string]: `0x${string}` } = {
  APP_FACTORY: process.env
    .NEXT_PUBLIC_APP_FACTORY_ADDRESS as `0x${string}`,
};
