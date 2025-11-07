import { Suspense } from "react";
import Compare from "./compare";
import CompareColumn from "./compareColumn";

// This allows Next.js to access searchParams in Server Components
export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const ccns = Array.isArray(params.ccn) ? params.ccn : params.ccn ? [params.ccn] : [];

  return (
    <div className="flex flex-row">
      {ccns.map((ccn) => (
        <CompareColumn ccn={ccn} key={ccn} />
      ))}
    </div>
  );
}
