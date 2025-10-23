
import { CardData } from "../types";

export function Sort(combinedCardData: CardData[], sortBy: string) {
    if (sortBy === "facility_name") {
        combinedCardData.sort(SortByName);
    } else if (sortBy === "H_001_01_OBSERVED") {
        // we need data outside the General Data dataset
        combinedCardData.sort(SortByCarePrefrence);
    }
}

// given a list of hospice data objects, sort them by their names in alphabetical order
function SortByName(a: CardData, b: CardData): number {
    return a.general_data.facility_name.localeCompare(b.general_data.facility_name);
}

// the reason why this one is so long is because we need to check if the score isn't available
function SortByCarePrefrence(a: CardData, b: CardData): number {
    // Get the scores from the data
    const aScore = a.sortby_medicare_scores.H_001_01_OBSERVED;
    const bScore = b.sortby_medicare_scores.H_001_01_OBSERVED;

    // Check which scores are 'Not Available'
    const aIsNA = aScore === 'Not Available';
    const bIsNA = bScore === 'Not Available';

    // --- Sorting rules ---

    // 1. If both are 'Not Available', they are equal
    if (aIsNA && bIsNA) {
        return 0;
    }
    
    // 2. If 'a' is 'Not Available', push it to the end (return 1)
    if (aIsNA) {
        return 1;
    }

    // 3. If 'b' is 'Not Available', push it to the end (return -1)
    if (bIsNA) {
        return -1;
    }

    // 4. If neither is 'Not Available', do the normal number comparison
    // (This sorts highest-to-lowest)
    return Number(bScore) - Number(aScore);
}