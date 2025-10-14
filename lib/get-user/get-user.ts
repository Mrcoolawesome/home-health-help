"use server"

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

// This will get the user and what type of user they are if it can.
// Be careful with using this function, because as explained in middleware.ts 
// if you run code between createClient and .getClaims (which .getUser uses)
// then you'll get super weird behavior where you'll keep getting logged in or out over and over
export async function getUser() {
    const supabase = await createClient();

    // WHATEVER YOU DO, DO NOT USE `.getUser` IT IS EVIL
    const { data, error } = await supabase.auth.getClaims();

    if (error) {
        console.error("Error fetching user:", error.message);
        return redirect("/auth/login");
    }

    const user = data?.claims;
    const isAuthed = user?.aud === "authenticated"; // check if user exists 

    // if it doesn't error then return the user type (auth vs anon) and their data
    return { isAuthed, user };
}