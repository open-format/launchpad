import validateSessionAndWallet from "@/lib/validateSessionAndWallet";
import { CreateAccountForm } from "./create-account-form";

export default async function CreateWeb3Account() {
  await validateSessionAndWallet("/home/apps");

  return <CreateAccountForm />;
}
