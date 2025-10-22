import { RawStateDataRecord } from "@/lib/types";

export async function getStateData(state: string): Promise<RawStateDataRecord[] | null> {
  try {
    const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%206d5ce6d8-19c8-5b46-80c5-8d0fbf107b4b%5D%5BWHERE%20state%20%3D%20%22${state}%22%5D`);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const data: RawStateDataRecord[] = await response.json();
    return data;

  } catch (error) {
    // Handle network errors or other exceptions
    console.error("Failed to fetch state CAHPS data:", error);
    return null;
  }
}

export async function getStateCahps(state: string): Promise<RawStateDataRecord[] | null> {
  try {
    const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%20d215814b-bd51-5a4d-90a6-ed78c9cec898%5D%5BWHERE%20state%20%3D%20%22${state}%22%5D`);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const data: RawStateDataRecord[] = await response.json();
    return data;

  } catch (error) {
    // Handle network errors or other exceptions
    console.error("Failed to fetch state CAHPS data:", error);
    return null;
  }
}