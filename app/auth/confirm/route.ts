import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Check for the standard PKCE code
  const code = searchParams.get("code");

  // Check for Invite/Magic Link specific parameters
  const token_hash = searchParams.get("access_token");
  console.log(token_hash);
  const type = searchParams.get("type") as EmailOtpType | null;

  const next = searchParams.get("next") ?? "/";

  // Scenario 1: Standard OAuth Code (Login, sometimes Sign up)
  if (code) {
    const supabase = createClient();
    const { error } = await (await supabase).auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }
  // Scenario 2: Invite or Magic Link (This is what you are missing!)
  else if (token_hash && type) {
    const supabase = createClient();
    const { error } = await (await supabase).auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // Error handling
  const errorUrl = new URL("/auth/error", request.url);
  errorUrl.searchParams.set("error", "Invalid link or link expired.");
  return NextResponse.redirect(errorUrl);
}
