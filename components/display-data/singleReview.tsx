import { PlaceReview } from "@/lib/types";
import { StarSolid } from "iconoir-react";

export default function SingleReview({ review }: { review: PlaceReview }) {
  return (
    <div className="border-t border-foreground m-2 p-2 ">
      <div className="flex flex-row">
        <span className="mr-2 underline">{review.author_name}</span>
        <StarSolid color="#d3d3ff" />
        <span className="mr-2">
          {review.rating}
        </span>
        <span className="text-foreground-alt">{review.relative_time_description}</span>
      </div>
      <div>
        {review.text}
      </div>
    </div>
  )
}
