"use client"

import { GetCmsByZip } from "@/lib/hospice-data/get-cms-by-zip";
import { GetProviderCardData } from "@/lib/hospice-data/get-provider-card-data";
import Link from "next/link";
import { useEffect, useState } from "react";

// the only thing about these is that they NEED to be named the same way that we'd expect them to be named from CMS's API
type HospiceCardData = {
    cms_certification_number_ccn: string
    facility_name: string,
    address_line_1: string
    countyparish: string,
    citytown: string,
    state: string,
    telephone_number: string,
    ownership_type: string
}

type Props = {
    page: number,
    zip: string
}

type HospiceProvider = {
    // Since the key is a string with spaces, it must be in quotes
    "cms_certification_number_ccn": string;
};

type CmsApiResponse = {
  providers: HospiceProvider[];
};

export default function HospiceCards({ page, zip }: Props) {
    const [hospiceDisplayData, setHospiceDisplayData] = useState<HospiceCardData[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchHospices = async () => {
            try {
                // Get the list of hospices and their CCNs
                const hospicesData: CmsApiResponse = await GetCmsByZip(zip);
                const cmsNumberList = hospicesData.providers.map(provider => provider['cms_certification_number_ccn']);

                // Fetch all details in parallel
                // Assumes getProviderDetailsByCcn(ccn) fetches the detailed data for one provider
                const detailPromises = cmsNumberList.map(ccn => GetProviderCardData(ccn));
                const rawDetailsArrays = await Promise.all(detailPromises);

                // SIMPLIFIED STEP: Just extract the provider object from each API response
                const hospiceCards: HospiceCardData[] = rawDetailsArrays.map(
                    // For each item in the main array...
                    // 1. Access the .providers property to get the inner array.
                    // 2. Access the first element [0] to get the final object.
                    // 3. The arrow function implicitly returns this object.
                    (item) => item.providers[0]
                );

                // Set the final data into your component's state
                setHospiceDisplayData(hospiceCards);

            } catch (err) {
                console.error("Failed to process hospice data:", err);
                setError("An error occurred while loading hospice details.");
            }
        };

        if (zip) {
            fetchHospices();
        }
    }, [page, zip]);

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
                                className="bg-backround border border-foreground-alt rounded-lg p-6 hover:bg-background-alt transition cursor-pointer hover:ring-2 hover:ring-primary"
                            >
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {facility?.facility_name}
                                </h3>
                                <p className="text-foreground-alt mb-3">
                                    {facility?.ownership_type}
                                </p>
                                <p className="text-foreground-alt mb-3">
                                    {facility?.telephone_number}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
