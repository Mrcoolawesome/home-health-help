import { getEnrichedProviderData } from "@/lib/hospice-data/get-enriched-provider-data";
import { QualityViewer } from "@/components/hospice-detail/quality-viewer";
import type { EnrichedProviderData } from "@/lib/types";

interface DetailPageProps {
  params: Promise<{
    ccn: string;
  }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { ccn } = await params;
  const data: EnrichedProviderData | null = await getEnrichedProviderData(ccn);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Provider Not Found</h1>
          <p className="text-gray-600">Unable to load provider data for CCN: {ccn}</p>
        </div>
      </div>
    );
  }

  return <QualityViewer data={data} />;
}
