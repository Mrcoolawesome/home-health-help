'use client'

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AuthError, PostgrestError } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function SetPasswordPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const [errorMessage, setErrorMessage] = useState("");

  // the error that occurs when using supabase auth is of type AuthError so we have to set this to be that type
  // allow null because Supabase returns `null` when there is no error
  const [error, setError] = useState<AuthError | PostgrestError | null>(null);

  const router = useRouter(); // Initialize router

  useEffect(() => {
    // 1. Get tokens from URL hash (e.g., #access_token=...)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      // 2. Use tokens to set the session for the user
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).then(({ error }) => {
        if (!error) {
          // Session is set! Now show the password form.
          console.log('Session successfully set.');
          // You can also clear the hash from the URL here if desired.
        } else {
          setError(error);
          console.error('Error setting session:', error);
        }
      });
    }

  }, []);

  // Inside your form submission handler (Client Component)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setError(null);

    // 5 second timeout for password update
    let updateResult;
    try {
      updateResult = await Promise.race([
        supabase.auth.updateUser({ password }),
        new Promise<{ error: unknown }>((resolve) =>
          setTimeout(() => resolve({ error: "Password update timed out, but may have succeeded." }), 5000)
        )
      ]);
      if (updateResult && updateResult.error && updateResult.error !== "Password update timed out, but may have succeeded.") {
        throw updateResult.error;
      }
      if (updateResult && updateResult.error === "Password update timed out, but may have succeeded.") {
        setErrorMessage(updateResult.error as string);
      }
    } catch (error: unknown) {
      setErrorMessage(error instanceof Error ? error.message : "An error occurred");
    }

    // Always run insert code after password update attempt
    let userId;
    try {
      const { data } = await supabase.auth.getUser();
      userId = data?.user?.id;
    } catch {
      userId = undefined;
    }
    if (userId) {
      const { error: insertError } = await supabase
        .from('users_marketer')
        .insert([{ id: userId, name: name }]);
      if (insertError) {
        setError(insertError);
        console.error("Error inserting user into users_marketer:", insertError);
      } else {
        router.push('/');
      }
    } else {
      setErrorMessage("Could not get user ID for marketer insert.");
    }
    setIsLoading(false);
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign up</CardTitle>
              <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Dr. Jane Doe"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="repeat-password">Repeat Password</Label>
                    </div>
                    <Input
                      id="repeat-password"
                      type="password"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-red-500">{error.message}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating an account..." : "Sign up"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
