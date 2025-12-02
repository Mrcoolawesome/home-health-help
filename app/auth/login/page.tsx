"use client";

import { LoginForm } from "@/components/login-form";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const message = params?.message as string | undefined;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {message && (<div className="mb-4 text-center font-medium text-green-600">{message}</div>)}
        <LoginForm />
      </div>
    </div>
  );
}
