'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/base-ui/card';
import { Button } from '@/components/base-ui/button';
import { Label } from '@/components/base-ui/label';
import { Input } from '@/components/base-ui/input';
import { SetHospicePassword } from '@/lib/auth/update-password'; // Import the new action
import { useRouter } from 'next/navigation';


export function SetPasswordHospice({ placeId, phoneNum, onBack }: { placeId: string; phoneNum: string; onBack: () => void; }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    setErrorMessage("");

    // 1. Client-side Validation
    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // 2. Call the Server Action
    // We don't need to manually append name/password because <form action={...}> 
    // automatically grabs inputs with 'name' attributes.
    const result = await SetHospicePassword(formData);

    // 3. Handle Result (Only happens on error, success redirects)
    // Handle the error where a matching phone number wasn't found
    const phoneError = result?.error === "Could not find a hospice matching that phone number.";
    if (phoneError) {
      setErrorMessage("The address you chose wasn't found in medicare's data.");
      const message = "We couldn't find that hospice in the medicare database. If you're a corporate business, please choose your regional office.";
      router.push(`/auth/set-password/hospice?error=${encodeURIComponent(message)}`);
      onBack(); // this goes back to the original page
    } else if (result?.error) {
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
              {/* Point the form to the client wrapper which calls the server action */}
              <form action={clientAction}>
                {/* HIDDEN INPUTS: This passes the props to the Server Action */}
                <input type="hidden" name="placeId" value={placeId} />
                <input type="hidden" name="phoneNum" value={phoneNum} />

                <div className="flex flex-col gap-6">
                  <div>
                    <Label htmlFor="company_name">Name</Label>
                    <Input
                      id="company_name"
                      name="company_name" // Needed for FormData
                      type="text"
                      placeholder="Tanner Clinic"
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
                      name="password" // Needed for FormData
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
                      // No 'name' needed, we don't send this to server, just validate locally
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
