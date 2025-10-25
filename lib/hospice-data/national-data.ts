import { RawNationalDataRecord } from "@/lib/types";

export async function getNationalData(footnote: boolean): Promise<RawNationalDataRecord[] | null> {
  try {
      const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%2061a6e76d-a020-59f1-be5e-8fd77aca5800%5D`);
  
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return null;
      }
  
      const data: RawNationalDataRecord[] = await response.json();

      if (!footnote) {
        return data.filter(record => !record["Footnote"] || record["Footnote"] === "");
      }

      return data;

    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Failed to fetch national data:", error);
      return null;
    }
}

import { RawNationalCahpsRecord } from "@/lib/types";

export async function getNationalCahps(footnote: boolean): Promise<RawNationalCahpsRecord[] | null> {
  try {
      const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%20cec9c15f-8712-5f08-ac05-918121f7c54d%5D`);
  
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return null;
      }
  
      const data: RawNationalCahpsRecord[] = await response.json();

      if (!footnote) {
        return data.filter(record => !record["Footnote"] || record["Footnote"] === "");
      }

      return data;

    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Failed to fetch national CAHPS data:", error);
      return null;
    }
}