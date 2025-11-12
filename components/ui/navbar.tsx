"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/get-user/get-user";
import { LogoutButton } from "../buttons/logout-button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "../theme-switcher";
import LoginButton from "../buttons/login-button";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // fetch the user on the initial check
    const fetchUser = async () => {
      const { isAuthed } = await getUser();
      setIsAuthenticated(isAuthed);
    };
    fetchUser();

    // then subscribe to listen to authentication changes
    // this listener function stays running in the background,
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // set the authenticated state to be the truthy value of the user session (whether they exist or not)
        setIsAuthenticated(!!session?.user);

        // refresh data on the current page if they just signed out or in
        if (_event === "SIGNED_IN" || _event === "SIGNED_OUT") {
          router.refresh();
        }
      },
    );

    // this is the cleanup function for the useEffect function
    // this gets rid of the background subscription upon changing/leaving the page
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [router, supabase]); // the router must be a dependency because it is used in the useEffect function

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-foreground-alt backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between items-center h-16">
          <Link
            href="/"
            className="text-xl font-bold text-foreground hover:text-foreground-alt transition"
          >
            Find Hospices
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/about"
              className="text-foreground hover:text-foreground-alt transition font-medium"
            >
              About
            </Link>
            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
