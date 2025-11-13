import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // If the env vars are not set, skip middleware check. You can remove this
  // once you setup the project.
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // Determine roles based on presence in tables
  let isHospice = false;
  let isMarketer = false;
  const userId = user?.sub as string | undefined; // it's possible they're not signed in so this can be undefined

  // Determine what kind of user they are
  if (userId) {
    const [{ count: hospiceCount }, { count: marketerCount }] = await Promise.all([
      supabase
        .from("users_hospice")
        .select("id", { count: "exact", head: true })
        .or(`user_id.eq.${userId},id.eq.${userId}`),
      supabase
        .from("users_marketer")
        .select("id", { count: "exact", head: true })
        .or(`user_id.eq.${userId},id.eq.${userId}`),
    ]);
    isHospice = (hospiceCount ?? 0) > 0;
    isMarketer = (marketerCount ?? 0) > 0;
  }

  // for regular users
  if (
    request.nextUrl.pathname !== "/" &&
    request.nextUrl.pathname !== "/about" &&
    !user &&
    !request.nextUrl.pathname.startsWith("/auth") &&
    !request.nextUrl.pathname.startsWith("/details") &&
    !request.nextUrl.pathname.startsWith("/compare") &&
    !request.nextUrl.pathname.startsWith("/auth/confirm")
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // If they're a hospice user then they should be allowed to access the dashboard
  if (
    request.nextUrl.pathname.startsWith("/admin-dashboard") ||
    request.nextUrl.pathname.startsWith("/admin-dasboard")
  ) {
    if (!isHospice) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
