import AddColumn from "@/components/compare/addColumn";
import NameColumn from "@/components/compare/nameColumn";
import CompareColumn from "@/components/compare/compareColumn";

// This allows Next.js to access searchParams in Server Components
export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const ccns = Array.isArray(params.ccn) ? params.ccn : params.ccn ? [params.ccn] : [];

  return (
    // 1. max-h-screen (or a fixed px) ensures the scroll happens HERE, not on body
    // 2. overflow-auto enables both X and Y scrolling simultaneously
    <div className="w-full overflow-auto max-h-[calc(100vh-100px)] border border-gray-200">

      {/* 3. min-w-max ensures the flex row doesn't try to squish columns */}
      <div className="flex flex-row min-w-max items-stretch h-full">

        {/* Note: Sticky columns usually need a background color to cover content scrolling under them */}
        <div className="z-20 md:sticky md:left-0 bg-background">
          <NameColumn />
        </div>

        {ccns.map((ccn) => (
          <CompareColumn ccn={ccn} key={ccn} />
        ))}

        {ccns.length < 5 && (
          <div className="w-svw sm:w-full">
            <AddColumn />
          </div>
        )}
      </div>
    </div>
  );
}
