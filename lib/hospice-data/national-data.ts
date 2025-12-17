import { RawNationalDataRecord } from "@/lib/types";
import { RawNationalCahpsRecord } from "@/lib/types";
import { NATIONAL_CAHPS_DATA, NATIONAL_DATA } from "../globals";
import { GetCmsData } from "./get-cms-data";

export async function getNationalData(): Promise<RawNationalDataRecord[] | null> {
  try {
    const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%20${NATIONAL_DATA}%5D`);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const data: RawNationalDataRecord[] = await GetCmsData(`[SELECT * FROM ${NATIONAL_DATA}]`);
    return data;

  } catch (error) {
    // Handle network errors or other exceptions
    console.error("Failed to fetch national data:", error);
    return null;
  }
}

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
