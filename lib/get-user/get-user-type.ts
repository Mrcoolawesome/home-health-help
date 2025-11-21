import { SupabaseClient } from "@supabase/supabase-js";

/**
 * This requires you give it the supabase client you're using in your current scope.
 * @returns The user's data along with two booleans marking what type of user they are
 */
export async function GetUserType(supabase: SupabaseClient) {
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // Determine roles based on presence in tables
  let isHospice = false;
  let isMarketer = false;
  let isAdmin = false;
  const userId = user?.sub as string | undefined; // it's possible they're not signed in so this can be undefined

  // Determine what kind of user they are
  if (userId) {
    const [{ count: hospiceCount }, { count: marketerCount }, { count: adminCount }] = await Promise.all([
      // We don't need to use .single() here because they might not exist in one of the tables 
      // so we don't wanna have it throw an error in the console if they're not in one of the tables.
      // Without .single() it will give us the desired behavior by not erroring if it can't find them.
      supabase
        .from("users_hospice")
        .select("id", { count: "exact", head: true })
        .eq('id', userId),
      supabase
        .from("users_marketer")
        .select("id", { count: "exact", head: true })
        .eq('id', userId),
      supabase
        .from("users_admin")
        .select("id", { count: "exact", head: true })
        .eq('id', userId),
    ]);
    isHospice = (hospiceCount ?? 0) > 0;
    isMarketer = (marketerCount ?? 0) > 0;
    isAdmin = (adminCount ?? 0) > 0;
  }

  // I know that returning seperate booleans to say kinda the same thing seems a bit uneccessary
  // but I like it better because it's clearer.
  return { user, isHospice, isMarketer, isAdmin }
}
