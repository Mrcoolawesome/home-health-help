import { Suspense } from "react";
import Compare from "./compare";

// This allows Next.js to access searchParams in Server Components
export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const ccns = Array.isArray(params.ccn) ? params.ccn : params.ccn ? [params.ccn] : [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Compare ccns={ccns} />
    </Suspense>
  );
}