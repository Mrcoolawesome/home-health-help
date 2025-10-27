
import { CardData } from "../types";

/**
 * You NEED to make your own special sort function for things that aren't just higher is better numerical values.
 * If they are just like that, then you can just pass the array into here and it'll use the SortByScore function
 * @param combinedCardData 
 * @param sortBy 
 */
export function Sort(combinedCardData: CardData[], sortBy: string) {
    // you need to add a case to this chain for special sort functions
    if (sortBy === "facility_name") {
        combinedCardData.sort(SortByName);
    } else { // this assumes just numerical values where higher is better
        combinedCardData.sort(SortByScore);
    }
}

// given a list of hospice data objects, sort them by their names in alphabetical order
function SortByName(a: CardData, b: CardData): number {
    return a.general_data.facility_name.localeCompare(b.general_data.facility_name);
}

// the reason why this one is so long is because we need to check if the score isn't available
// this function is assuming a 'higher is better' set of numbers
function SortByScore(a: CardData, b: CardData): number {
    // Get the scores from the data
    const aScore = a.sortby_medicare_scores.score;
    const bScore = b.sortby_medicare_scores.score;

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