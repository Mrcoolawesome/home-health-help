"use server"

import { AuthError } from "@supabase/supabase-js";
import { CreateAdminClient } from "../create-admin-client";

// now we wanna loop through each email and invite them through supabase
export default async function InviteUsers(formData: FormData) {
  // This is our own custom createClient function that makes the client an admin client
  const supabase = CreateAdminClient();

  const emails = formData
    .getAll("email") // this method get's all of the elements associated with a given key
    .map((v) => String(v).trim().toLowerCase());

  // this shouldn't ever happen but it's here just in case
  if (emails.length === 0) {
    return;
  }; 

  try{
    emails.map(async (email) => { // have to mark this map function as async as well otherwise we can't await for stuff in it
      // invite the specific email and then redirect them to the /auth/set-password/marketer endpoint
      const { error: inviteUsersError } = await supabase.auth.admin.inviteUserByEmail(
        email,
        {
          redirectTo: `https://hospicefind.com/auth/set-password/marketer` // this will only work in production
        }       
      );

      // this error is of type AuthError btw
      if (inviteUsersError) throw inviteUsersError; // throw the error if it exists
    })
  } catch(error: unknown) { // apparently typescript catch variables can only be typed as 'unkown' or 'any'
    if (error instanceof AuthError) {
      // handle Supabase auth errors
      console.error('Invite failed:', error.message);
    } else if (error instanceof Error) {
      console.error('Unexpected error:', error.message);
    } else {
      console.error('Unknown error inviting users');
    }
  }
}