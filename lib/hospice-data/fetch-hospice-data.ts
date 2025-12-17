"use server"

import { DisplayCardData } from "./get-displaycard-data";
import { CardData, Code } from "../types";

/**
 * Server action to fetch hospice display card data.
 * This runs on the server, avoiding CORS issues with the CMS API.
 */
export async function fetchHospiceData(zip: string, measureCode: string, scoreData?: Code): Promise<{ success: true; data: CardData[] } | { success: false; error: string }> {
    try {
        const cardData = await DisplayCardData(zip, measureCode, scoreData);
        return { success: true, data: cardData };
    } catch (error) {
        console.error("Failed to fetch hospice data:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "An error occurred while loading hospice details." 
        };
    }
}
