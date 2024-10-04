import { appFactoryAbi } from "@/abis/AppFactory";
import { tokenFactoryAbi } from "@/abis/ERC20FactoryFacet";
import { badgeFactoryAbi } from "@/abis/ERC721FactoryFacet";
import { BaseError, TransactionReceipt, parseEventLogs } from "viem";
import { publicClient } from "./viem/config";

export async function handleTransaction(
  walletClient: any,
  address: `0x${string}`,
  abi:
    | typeof appFactoryAbi
    | typeof tokenFactoryAbi
    | typeof badgeFactoryAbi,
  functionName: "create" | "createERC20" | "createERC721",
  args: any,
  eventName: "Created"
) {
  try {
    const { request } = await publicClient.simulateContract({
      address,
      abi,
      functionName,
      args,
    });

    const result = await walletClient.writeContract(request);

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
export async function getEventLog(
  receipt: TransactionReceipt,
  abi: typeof appFactoryAbi | typeof tokenFactoryAbi,
  eventName: "Created"
) {
  try {
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
