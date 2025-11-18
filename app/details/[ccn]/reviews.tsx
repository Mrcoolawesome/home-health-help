import SingleReview from "@/components/details/singleReview";
import { getNewestReviews } from "@/lib/google/get-reviews";
import { PlaceReview } from "@/lib/types";

export default async function GoogleReviews({ placeID }: { placeID: string }) {
  const reviews = await getNewestReviews(placeID);

  return (
    <div className="container mx-auto w-full px-4 py-8 space-y-8">
      <section className="rounded-lg border border-foreground-alt bg-background text-foreground p-6">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {reviews?.result.reviews?.map((review: PlaceReview, index) => (
          <SingleReview review={review} key={index} />
        ))}
      </section>
    </div>
  )
}
