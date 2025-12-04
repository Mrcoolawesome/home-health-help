'use client'

import { ChooseLocation } from "@/components/hospice-choose-location";
import { useSearchParams } from "next/navigation";


export default function Page() {
  const params = useSearchParams();
  const error = params.get("error");
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      {error && <p className="text-sm text-red-500">{error}</p>}
      <ChooseLocation />
    </div>
  );
}
