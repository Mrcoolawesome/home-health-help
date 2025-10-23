"use client"

import { GetCmsByZip } from "@/lib/hospice-data/get-cms-by-zip";
import { GetProviderData } from "@/lib/hospice-data/get-provider-card-data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImportantHospiceData } from "@/lib/types";
import { SortByName } from "@/lib/sortby-functions/sortby-functions";
import { FetchDistanceMap } from "@/lib/sortby-functions/zipcode-helper/fetch-distance-map";

type Props = {
    page: number,
    zip: string,
    sortBy: string
}

type HospiceProvider = {
    // Since the key is a string with spaces, it must be in quotes
    "cms_certification_number_ccn": string;
};

type CmsApiResponse = {
  providers: HospiceProvider[];
};

export default function HospiceCards({ page, zip, sortBy }: Props) {
    const [hospiceDisplayData, setHospiceDisplayData] = useState<ImportantHospiceData[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchHospices = async () => {
            try {
                // Get the list of hospices and their CCNs
                const hospicesData: CmsApiResponse = await GetCmsByZip(zip);
                const cmsNumberList = hospicesData.providers.map(provider => provider['cms_certification_number_ccn']);

                // Fetch all details in parallel
                // Assumes getProviderDetailsByCcn(ccn) fetches the detailed data for one provider
                const desiredData = "cms_certification_number_ccn,facility_name,address_line_1,citytown,countyparish,state,telephone_number,ownership_type,zip_code";
                const DATASET_ID = '25a385ec-f668-500d-8509-550a8af86eff'; // Hospice - Provider Data
                const detailPromises = cmsNumberList.map(ccn => GetProviderData(desiredData, ccn, DATASET_ID));
                const rawDetailsArrays = await Promise.all(detailPromises);

                // SIMPLIFIED STEP: Just extract the provider object from each API response
                const hospiceData: ImportantHospiceData[] = rawDetailsArrays.map(
                    // For each item in the main array...
                    // 1. Access the .providers property to get the inner array.
                    // 2. Access the first element [0] to get the final object.
                    // 3. The arrow function implicitly returns this object.
                    (item) => item.providers[0]
                );

                // This map will hold our distances if we need them
                let distanceMap = new Map<string, number>();

                // If sorting by distance, PRE-FETCH all distances
                if (sortBy === "zip_code") {
                    const destinationZips = hospiceData.map(h => h.zip_code);
                    distanceMap = await FetchDistanceMap(zip, destinationZips);
                }

                // sort by whatever order they specify
                if (sortBy === "facility_name") {
                    hospiceData.sort(SortByName);
                } else if (sortBy === "zip_code") {
                    const SortByDistance = (a: ImportantHospiceData, b: ImportantHospiceData) => {
                        const distA = distanceMap.get(a.zip_code) || Infinity;
                        const distB = distanceMap.get(b.zip_code) || Infinity;
                        return distA - distB;
                    };
                    hospiceData.sort(SortByDistance);
                }

                // Set the final data into your component's state
                setHospiceDisplayData(hospiceData);

            } catch (err) {
                console.error("Failed to process hospice data:", err);
                setError("An error occurred while loading hospice details.");
            }
        };

        if (zip) {
            fetchHospices();
        }
    }, [page, zip, sortBy]);

    if (error) {
        return <div className="max-w-4xl mx-auto px-4 py-8 text-red-400">{error}</div>;
    }

    return (
        <div id="hospice-display-box" className="max-w-4xl mx-auto px-4 py-8">
            {hospiceDisplayData.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                    <p>No physicians found. Sign up to get started!</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {hospiceDisplayData.map((facility) => (
                        <Link key={facility?.cms_certification_number_ccn} href={`/details/${facility?.cms_certification_number_ccn}`}>
                            <div
                                className="bg-white/10 border border-white/20 rounded-lg p-6 hover:bg-white/15 hover:border-white/30 transition cursor-pointer"
                            >
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {facility?.facility_name}
                                </h3>
                                <p className="text-gray-300 mb-3">
                                    {facility?.ownership_type}
                                </p>
                                <p className="text-gray-300 mb-3">
                                    {facility?.telephone_number}
                                </p>
                                <p className="text-gray-300 mb-3">
                                    {facility?.citytown}, {facility?.zip_code}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
