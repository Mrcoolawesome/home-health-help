import { RawNationalDataRecord } from "@/lib/types";

export async function getNationalData(): Promise<RawNationalDataRecord[] | null> {
  try {
      const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%2061a6e76d-a020-59f1-be5e-8fd77aca5800%5D`);
  
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return null;
      }
  
      const data: RawNationalDataRecord[] = await response.json();
      return data;

    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Failed to fetch national data:", error);
      return null;
    }
}