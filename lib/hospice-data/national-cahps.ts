import { RawNationalCahpsRecord } from "@/lib/types";

export async function getNationalCahps(): Promise<RawNationalCahpsRecord[] | null> {
  try {
      const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%20cec9c15f-8712-5f08-ac05-918121f7c54d%5D`);
  
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return null;
      }
  
      const data: RawNationalCahpsRecord[] = await response.json();
      return data;

    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Failed to fetch national CAHPS data:", error);
      return null;
    }
}