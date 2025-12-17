import { NextResponse } from "next/server";

// This function contains the logic that was in your `/api/get-data` route
export async function GetCmsData(query: string) {
  // NOTE: if it has to get too many rows at once their api might just error and return nothing.
  const CMS_QUERY_URL = `https://data.cms.gov/​provider-data​/api​/1​/datastore​/sql?query=${query}&show_db_columns=true`;
  // added on the '&show_db_columns=true' so that the headers of each of the pieces of data are what they're called in their db
  const cleanedUrl = CMS_QUERY_URL.replace(/[\u200B-\u200D\uFEFF]/g, ''); // this is so weird but for whatever reason the code reads the final url with a bunch of whitespace that doesn't exist so we have to get rid of the invisible whitespace
  try {
    // Make the external GET request using fetch
    const response = await fetch(cleanedUrl, {
      // Optional: Set a cache-control header if you want Next.js to cache the response
      // This can reduce the number of calls to the CMS API.
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    // Handle non-200 HTTP statuses from the CMS API
    if (!response.ok) {
      console.error(`CMS API Error: ${response.statusText}`);
      // Return a generic server error to the client
      return NextResponse.json(
        { error: 'Failed to fetch data from CMS API.' },
        { status: 500 }
      );
    }

    // Parse the JSON response
    const providerData = await response.json();

    return providerData;

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
