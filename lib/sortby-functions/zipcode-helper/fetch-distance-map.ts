/**
 * Fetches a map of distances from an origin zip to multiple destination zips.
 * @param originZip The user's (origin) zip code.
 * @param destinationZips An array of facility (destination) zip codes.
 * @returns A Map<string, number> where key is the zip code and value is the distance in meters.
 */
export async function FetchDistanceMap(originZip: string, destinationZips: string[]): Promise<Map<string, number>> {
  try {
    const response = await fetch('/api/get-distances', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originZip, destinationZips })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch distance map from API');
    }

    // The API returns a plain object: { "90210": 15000, ... }
    const distances: Record<string, number> = await response.json();

    // Convert the object into a true Map for easier lookups
    return new Map(Object.entries(distances));

  } catch (error) {
    console.error("Error in fetchDistanceMap:", error);
    // Return an empty map on failure so the app doesn't crash
    return new Map();
  }
}