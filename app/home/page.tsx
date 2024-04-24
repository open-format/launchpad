import getUserSession from "@/lib/getUserSession";
import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
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

  if (!wallet.data) {
    return redirect("/onboarding/create-account");
  }

  redirect("/home/apps");
}
