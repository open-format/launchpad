import { appFactoryAbi } from "@/abis/AppFactory";
import { tokenFactoryAbi } from "@/abis/ERC20FactoryFacet";
import { BaseError, parseEventLogs } from "viem";
import { getAccountClient, publicClient } from "./viem/config";

export async function handleTransaction(
  pk: string,
  address: `0x${string}`,
  abi: typeof appFactoryAbi | typeof tokenFactoryAbi,
  functionName: "create" | "createERC20",
  args: any,
  eventName: "Created"
) {
  try {
    const { account, accountClient } = getAccountClient(pk);

    const { request } = await publicClient.simulateContract({
      account,
      address,
      abi,
      functionName,
      args,
    });

    const result = await accountClient.writeContract(request);

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: result,
    });

    const logs = parseEventLogs({
      abi,
      eventName,
      logs: receipt.logs,
    });

    //@DEV This is suitable for now, but may need to be updated in the future.
    return logs[0].args.id;
  } catch (error: any) {
    if (error instanceof BaseError) {
      if (error.details) {
        throw new Error(error.details);
      } else if (error.metaMessages) {
        throw new Error(error.metaMessages[0]);
      }
    } else {
      throw new Error(error.message);
    }
  }
}
