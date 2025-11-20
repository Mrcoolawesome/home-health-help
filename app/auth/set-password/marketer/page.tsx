'use client'

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AuthError, PostgrestError } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const supabase = createClient();

export default function SetPasswordPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // the error that occurs when using supabase auth is of type AuthError so we have to set this to be that type
  // allow null because Supabase returns `null` when there is no error
  const [error, setError] = useState<AuthError | PostgrestError | null>(null);

  const router = useRouter(); // Initialize router

  // Inside your form submission handler (Client Component)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // make it so that it shows that it's loading

    // Since the session is set, this updates the currently logged-in user
    const { data: userData, error: updateUserPasswordError } = await supabase.auth.updateUser({
      password: password,
    });

    if (!updateUserPasswordError && userData) {
      // Insert new user entry into 'users_marketer' table
      const { error: insertError } = await supabase
        .from('users_marketer')
        .insert([{ id: userData.user.id, name: name }]);

      if (insertError) {
        setError(insertError);
        console.error("Error inserting user into users_marketer:", insertError);
      } else {
        // Success! Redirect the user to the main app dashboard
        router.push('/');
      }
    } else {
      setError(updateUserPasswordError);
      console.error("Error updating user password:", updateUserPasswordError);
    }

    // stop showing the loading icon because at this point we're done
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
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
