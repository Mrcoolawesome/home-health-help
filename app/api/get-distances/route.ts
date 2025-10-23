import { NextResponse } from 'next/server';

type RequestBody = {
  originZip: string;
  destinationZips: string[];
};

// This type definition is from the Google Routes API response
type MatrixRow = {
  originIndex: number;
  destinationIndex: number;
  distanceMeters?: number;
};

export async function POST(request: Request) {
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!GOOGLE_API_KEY) {
    console.error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set");
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const { originZip, destinationZips }: RequestBody = await request.json();

    if (!originZip || !destinationZips || destinationZips.length === 0) {
      return NextResponse.json({ error: 'Missing origin or destinations' }, { status: 400 });
    }

    // Build the request for Google's API
    const origins = [{ waypoint: { address: originZip } }];
    const destinations = destinationZips.map(zip => ({ waypoint: { address: zip } }));

    const body = {
      origins,
      destinations,
      travelMode: "DRIVE",
    };

    // Call the Google computeRouteMatrix API
    const response = await fetch('https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_API_KEY,
        'X-Goog-FieldMask': 'destinationIndex,distanceMeters,status'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Google Routes API');
    }

    const matrix: MatrixRow[] = await response.json();

    console.log(matrix);

    // Create a simple map to return: { "zip_code": distance_in_meters }
    const distanceMap: Record<string, number> = {};
    
    matrix.forEach(row => {
      const zip = destinationZips[row.destinationIndex];
      // status 0 is "OK"
      const distance = row.distanceMeters || 0; // put it as zero meters if it's the same zip code
      distanceMap[zip] = distance;
    });

    console.log(distanceMap);

    return NextResponse.json(distanceMap);

  } catch (err) {
    console.error("API Route Error (get-distances):", err);
    return NextResponse.json({ error: 'Failed to calculate distances' }, { status: 500 });
  }
}