'use client'

import { Suspense } from "react";
import { ChooseLocation } from "@/components/forms/hospice-choose-location-form";
import { useSearchParams } from "next/navigation";

// 1. Extract the logic that uses search params into a small sub-component
function ErrorMessage() {
  const params = useSearchParams();
  const error = params.get("error");

  if (!error) return null;

  return <p className="text-sm text-red-500">{error}</p>;
}

// 2. Wrap that component in Suspense inside your main Page
export default function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {/* The fallback is what shows while the params are loading (nothing in this case) */}
      <Suspense fallback={null}>
        <ErrorMessage />
      </Suspense>

      <ChooseLocation />
    </div>
  );
}
