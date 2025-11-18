import { PlaceReview } from "@/lib/types";

export default function SingleReview({ review }: { review: PlaceReview }) {
  return (
    <div>
      {review.text}
    </div>
  )
}
