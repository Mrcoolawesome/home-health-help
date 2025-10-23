
import { ImportantHospiceData } from "../types";

// given a list of hospice data objects, sort them by their names in alphabetical order
export function SortByName(a: ImportantHospiceData, b: ImportantHospiceData): number {
    console.log("are we here?")
    return a.facility_name.localeCompare(b.facility_name);
}