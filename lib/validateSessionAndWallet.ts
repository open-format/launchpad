"use server";

import { redirect } from "next/navigation";
import getUserSession from "./getUserSession";
import createSupabaseServerClient from "./supabase/server";

export default async function validateSessionAndWallet(next: string) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await getUserSession();

  if (!user) {
    return redirect("/login");
  }

  const wallet = await supabase
    .from("wallet")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (wallet.data) {
    return redirect(next);
  }
}
