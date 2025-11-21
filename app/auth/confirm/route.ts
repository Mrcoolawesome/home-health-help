import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/"; // Where to redirect after success

  if (code) {
    const supabase = createClient();
    const { error } = await (await supabase).auth.exchangeCodeForSession(code);
    if (!error) {
      // On success, redirect to the user's dashboard or home page
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // If there's an error or no code, redirect to an error page
  // You can add the error message to the URL if you want
  const errorUrl = new URL("/auth/error", request.url);
  errorUrl.searchParams.set(
    "error",
    "Sorry, something went wrong logging you in.",
  );
  return NextResponse.redirect(errorUrl);
}
