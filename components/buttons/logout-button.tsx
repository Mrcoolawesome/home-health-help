"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/base-ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    // Local scope so that their cookie is removed from their browser
    await supabase.auth.signOut({ scope: 'local' });
    router.refresh();
    router.push("/auth/login");
  };

  return <Button onClick={logout}>Logout</Button>;
}
