import { RawNationalDataRecord } from "@/lib/types";

export async function getNationalData(): Promise<RawNationalDataRecord[] | null> {
  try {
    const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%20${NATIONAL_DATA}%5D`);

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

import { RawNationalCahpsRecord } from "@/lib/types";
import { NATIONAL_CAHPS_DATA, NATIONAL_DATA } from "../globals";

export async function getNationalCahps(): Promise<RawNationalCahpsRecord[] | null> {
  try {
    const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%20${NATIONAL_CAHPS_DATA}%5D`);

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
