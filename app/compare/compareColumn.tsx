'use client'

import { getCombinedProviderData } from "@/lib/hospice-data/provider-data";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ProviderData } from "@/lib/types";

export default function CompareColumn({ ccn }: { ccn: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [data, setData] = useState<ProviderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMeasures = async () => {
      try {
        const response = await getCombinedProviderData(ccn);
        response?.measures.sort((a, b) => {
          return a.measureCode.localeCompare(b.measureCode);
        })
        setData(response);
        setLoading(false);
      }
      catch (err) {
        console.log(err);
      }
    }

    getMeasures();
  }, [])

  function deleteCCN(ccn: string) {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete('ccn', ccn);

    router.replace(`${pathname}?${newParams.toString()}`);
  }

  if (loading) {
    return (
      <div className="min-w-[200px]">loading...</div>
    )
  }

  return (
    <div className="min-w-[200px] flex flex-col">
      <div className="sticky top-[40px] flex flex-col bg-background">
        <button onClick={() => deleteCCN(ccn)} >Delete</button>
        <div className="h-[60px] line-clamp-2 border border-foreground p-1">
          {data?.facilityName}
        </div>
      </div>
      {data?.measures.map((measure) => (
        <div key={measure.measureCode} className="w-full border border-foreground p-1 h-[60px]">
          {measure.score}
        </div>
      ))}
    </div>
  )
}
