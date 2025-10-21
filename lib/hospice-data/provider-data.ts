import { ProviderData, RawCMSRecord } from "@/lib/types";

/**
 * Transforms raw CMS API data into a structured format
 * Groups facility info and creates an array of measures
 */
function transformProviderData(rawData: RawCMSRecord[]): ProviderData | null {
  if (!rawData || rawData.length === 0) {
    return null;
  }

  // Use the first record for facility info (all records have the same facility data)
  const firstRecord = rawData[0];

  return {
    ccn: firstRecord["CMS Certification Number (CCN)"],
    facilityName: firstRecord["Facility Name"],
    addressLine1: firstRecord["Address Line 1"],
    addressLine2: firstRecord["Address Line 2"],
    city: firstRecord["City/Town"],
    state: firstRecord["State"],
    zipCode: firstRecord["ZIP Code"],
    county: firstRecord["County/Parish"],
    phone: firstRecord["Telephone Number"],
    cmsRegion: firstRecord["CMS Region"],
    measures: rawData.map(record => ({
      measureCode: record["Measure Code"],
      measureName: record["Measure Name"],
      score: record["Score"],
      footnote: record["Footnote"],
      measureDateRange: record["Measure Date Range"]
    }))
  };
}

export async function getProviderData(ccn: string): Promise<ProviderData | null> {
  try {
    const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%20098c6cc4-7426-5407-aae1-b361fc2072d6%5D%5BWHERE%20cms_certification_number_ccn%20%3D%20%22${ccn}%22%5D`);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const rawData: RawCMSRecord[] = await response.json();
    
    // Transform the data into structured format
    return transformProviderData(rawData);

  } catch (error) {
    // Handle network errors or other exceptions
    console.error("Failed to fetch user data:", error);
    return null;
  }
}
