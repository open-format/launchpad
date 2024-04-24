"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

// @TODO: Implement magic link
export async function signInWithOtp({ email }: { email: string }) {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signInWithOtp({
    email: email,
  });
  return JSON.stringify(result);
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();

  // redirect("/login");
}
