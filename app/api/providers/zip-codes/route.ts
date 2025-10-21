import { NextResponse } from "next/server";

// This is the route that get's the providers CMS number's that work within a zip code area
// We need to make it clear that this will show a list of providers that work within the spcified zip-code
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const zipCode = searchParams.get('zip');

    if (!zipCode) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    // 1. Define the CMS API constants
    const DATASET_ID = 'ada0e594-5ace-5084-a7c2-87adc51a27f7'; // Hospice zip-data
    // this is where we specify what data we want via SQLish syntax
    // NOTE: if it has to get too much stuff at once it might just error, but like theres never more than like a dozen
    // hospices operating in the same zip code so it should be fine to not have to put a limit on this
    const query = `[SELECT cms_certification_number_ccn FROM ${DATASET_ID}][WHERE zip_code = "${zipCode}"]`;
    const CMS_QUERY_URL = `https://data.cms.gov/​provider-data​/api​/1​/datastore​/sql?query=${query}`;

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

        // Return the data to the front-end
        return NextResponse.json({
            zipCode: zipCode,
            providers: providerData
        });

    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { error: 'An unexpected server error occurred.' },
            { status: 500 }
        );
    }


}