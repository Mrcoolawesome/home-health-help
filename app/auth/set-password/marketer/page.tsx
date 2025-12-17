'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/base-ui/card';
import { Button } from '@/components/base-ui/button';
import { Label } from '@/components/base-ui/label';
import { Input } from '@/components/base-ui/input';
import { SetMarketerPassword } from '@/lib/auth/update-password';

export default function SetMarketerPasswordPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    setErrorMessage("");

    // 1. Client-side Validation
    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // 2. Append values to FormData manually since we are using controlled inputs
    // (Or you can just pass new FormData(e.target) if you remove the controlled state)
    formData.set('name', name);
    formData.set('password', password);

    // 3. Call the Server Action
    // we NEED to make this a server action otherwise it won't work because of how we lock the auth stuff when they go through 'confirm-page'
    const result = await SetMarketerPassword(formData);

    // 4. Handle Result (Only happens if there is an error, otherwise action redirects)
    if (result?.error) {
      setErrorMessage(result.error);
      setIsLoading(false);
    }
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
              {/* Use action={clientAction} instead of onSubmit */}
              <form action={clientAction}>
                <div className="flex flex-col gap-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name" // Name attribute is required for FormData
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
                      name="password" // Name attribute is required for FormData
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
                      // No name needed here, we don't send this to server
                      type="password"
                      required
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </div>
                  {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
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
