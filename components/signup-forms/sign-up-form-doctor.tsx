"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export function SignUpFormDoctor({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [referralStatus, setReferralStatus] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { data: userData, error: authSignUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });

      if (authSignUpError) {
        console.error('Error:', authSignUpError);
      };

      // once we have them in the auth table we need to link that to the public table
      const { error: createUserDoctorError } = await supabase.from("users_doctors")
        .insert({id: userData.user?.id, name, specialization, referral_status: referralStatus});

      if (createUserDoctorError) {
        console.error('Error', createUserDoctorError);
      }
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      console.log(error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name"
                  type="name"
                  placeholder="Dr. Jane Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="specialization">Specialization</Label>
                <Input 
                  id="specialization"
                  type="specialization"
                  placeholder="Primary Care"
                  required
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="referral_status">Referral status</Label>
                <Checkbox 
                  id="referral"
                  required
                  checked={referralStatus}
                  onCheckedChange={(checked) => setReferralStatus(checked === true)}
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
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating an account..." : "Sign up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
