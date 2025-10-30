import { CardData } from "../types";

/**
 * Generic sorting function for scores that handles both numeric and non-numeric values.
 * Sorts in descending order (highest to lowest), pushing non-numeric scores to the bottom.
 * 
 * @param a - First item to compare
 * @param b - Second item to compare
 * @param getScore - Function that extracts the score string from an item
 * @returns Sort comparison number
 */
export function sortByScoreGeneric<T>(
    a: T,
    b: T,
    getScore: (item: T) => string
): number {
    // Get the scores using the provided getter function
    const aScore = getScore(a);
    const bScore = getScore(b);

    // Try to parse as numbers
    const aNum = parseFloat(aScore);
    const bNum = parseFloat(bScore);

    // Check if scores are valid numbers
    const aIsValid = !isNaN(aNum);
    const bIsValid = !isNaN(bNum);

    // --- Sorting rules ---

    // 1. If both are invalid, maintain their order
    if (!aIsValid && !bIsValid) {
        return 0;
    }
    
    // 2. If 'a' is invalid, push it to the end (return 1)
    if (!aIsValid) {
        return 1;
    }

    // 3. If 'b' is invalid, push it to the end (return -1)
    if (!bIsValid) {
        return -1;
    }

    // 4. Both are valid numbers, sort descending (highest first)
    return bNum - aNum;
}

/**
 * Sorting function for Yes/No values.
 * Order: "Yes" > "No" > "Not Available" (or any other value)
 */
function SortByYesNo(a: CardData, b: CardData): number {
    const aScore = a.sortby_medicare_scores.score;
    const bScore = b.sortby_medicare_scores.score;

    // Define priority order
    const getPriority = (score: string): number => {
        if (score === "Yes") return 3;
        if (score === "No") return 2;
        return 1; // "Not Available" or any other value goes to bottom
    };

    const aPriority = getPriority(aScore);
    const bPriority = getPriority(bScore);

    return bPriority - aPriority; // Higher priority first
}

/**
 * Sorting function for N/A values - sorts alphabetically by facility name.
 */
function SortByNA(a: CardData, b: CardData): number {
    return SortByName(a, b);
}

/**
 * Sorting function for 'min' values - sorts by numeric amount (greatest to least).
 */
function SortByMin(a: CardData, b: CardData): number {
    return sortByScoreGeneric(a, b, (item) => item.sortby_medicare_scores.score);
}

/**
 * Sorting function for '$' values - sorts by numeric amount (greatest to least).
 */
function SortByDollar(a: CardData, b: CardData): number {
    return sortByScoreGeneric(a, b, (item) => item.sortby_medicare_scores.score);
}

/**
 * You NEED to make your own special sort function for things that aren't just higher is better numerical values.
 * If they are just like that, then you can just pass the array into here and it'll use the SortByScore function
 * @param combinedCardData 
 * @param sortBy 
 * @param lower_is_better 
 */
export function Sort(combinedCardData: CardData[], sortBy: string, lower_is_better: boolean) {
    // Handle special sort cases
    if (sortBy === "") {
        combinedCardData.sort(SortByName);
    } else if (sortBy === "N/A") {
        combinedCardData.sort(SortByNA);
    } else if (sortBy === "yes/no") {
        combinedCardData.sort(SortByYesNo);
    } else if (sortBy === "min") {
        combinedCardData.sort(SortByMin);
    } else if (sortBy === "$") {
        combinedCardData.sort(SortByDollar);
    } else { // this assumes just numerical values where higher is better
        combinedCardData.sort((a, b) => SortByScore(a, b, lower_is_better));
    }
}

// given a list of hospice data objects, sort them by their names in alphabetical order
function SortByName(a: CardData, b: CardData): number {
    return a.general_data.facility_name.localeCompare(b.general_data.facility_name);
}

// the reason why this one is so long is because we need to check if the score isn't available
// this function handles both 'higher is better' and 'lower is better' based on the parameter
function SortByScore(a: CardData, b: CardData, lower_is_better: boolean): number {
    const result = sortByScoreGeneric(a, b, (item) => item.sortby_medicare_scores.score);
    // Reverse the sort order if lower is better
    return lower_is_better ? -result : result;
}