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

    // check if the user is authenticated 
    const user = data?.claims;
    const isAuthed = user?.aud === "authenticated"; // this might actually just check if they exist
    // this is because 'authenticated' in this context might just mean they have authenticated their account at one point

    // get the type of user they are and return that 
    let type = undefined;
    const { data: isDoctor } = await supabase.from("users_doctors").select("id").eq('id', user?.sub);
    if (isDoctor) {
        type = "doctor";
    }

    const { data: isHomeHealth } = await supabase.from("users_hh").select("id").eq('id', user?.sub);
    if (isHomeHealth) {
        type = "homeHealth"
    }

    // if it doesn't error then return the user type (auth vs anon) and their data
    return { isAuthed, user, type };
}