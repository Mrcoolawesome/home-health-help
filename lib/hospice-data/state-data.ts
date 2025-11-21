import { RawStateDataRecord } from "@/lib/types";
import { STATE_CAHPS_DATA, STATE_DATA } from "../globals";

export async function getStateData(state: string): Promise<RawStateDataRecord[] | null> {
  try {
    const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%20${STATE_DATA}%5D%5BWHERE%20state%20%3D%20%22${state}%22%5D`);

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
    const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%20${STATE_CAHPS_DATA}%5D%5BWHERE%20state%20%3D%20%22${state}%22%5D`);

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
