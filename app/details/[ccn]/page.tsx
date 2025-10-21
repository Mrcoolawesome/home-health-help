import { getProviderData } from "@/lib/hospice-data/provider-data";
import type { ProviderData } from "@/lib/types";

interface DetailPageProps {
  params: {
    ccn: string;
  }
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { ccn } = await params;
  const data: ProviderData | null = await getProviderData(ccn);
  
  if (!data) {
    return <div>Failed to load provider data</div>;
  }

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}
