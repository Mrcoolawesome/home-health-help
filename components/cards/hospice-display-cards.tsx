"use client"

import { GetCmsByZip } from "@/lib/hospice-data/get-cms-by-zip";
import { GetProviderData } from "@/lib/hospice-data/get-provider-card-data";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GeneralData, CardData, SortbyMedicareScores } from "@/lib/types";
import { SortByCarePrefrence, SortByName } from "@/lib/sortby-functions/sortby-functions";
import { GetSortbyData } from "@/lib/sortby-functions/get-sortby-data";

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
    const [hospiceDisplayData, setHospiceDisplayData] = useState<CardData[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchHospices = async () => {
            try {
                // Get the list of hospices and their CCNs
                const hospicesData: CmsApiResponse = await GetCmsByZip(zip);
                const cmsNumberList = hospicesData.providers.map(provider => provider['cms_certification_number_ccn']);

                // Fetch all details in parallel
                // Assumes getProviderDetailsByCcn(ccn) fetches the detailed data for one provider
                const desiredGeneralData = "cms_certification_number_ccn,facility_name,address_line_1,citytown,countyparish,state,telephone_number,ownership_type";
                const GENERAL_DATA_DATASET_ID = '25a385ec-f668-500d-8509-550a8af86eff'; // Hospice - General Data
                const detailedPromisesGeneralData = cmsNumberList.map(ccn => GetProviderData(desiredGeneralData, ccn, GENERAL_DATA_DATASET_ID));
                const rawGeneralDetailsArrays = await Promise.all(detailedPromisesGeneralData);

                // SIMPLIFIED STEP: Just extract the provider object from each API response
                const generalHospiceData: GeneralData[] = rawGeneralDetailsArrays.map(
                    // For each item in the main array...
                    // 1. Access the .providers property to get the inner array.
                    // 2. Access the first element [0] to get the final object.
                    // 3. The arrow function implicitly returns this object.
                    (item) => item.providers[0]
                );

                // i wanna get the information from both the GedProviderData and the GetSortbyData functions, and put them both into
                // the elements of a CardData[] array

                const desiredProviderData = "score";
                const PROVIDER_DATA_DATASET_ID = "098c6cc4-7426-5407-aae1-b361fc2072d6"; // Hospice - Provider Data
                const measureCode = "H_001_01_OBSERVED";
                const detailedPromisesProviderData = cmsNumberList.map(ccn => GetSortbyData(desiredProviderData, ccn, PROVIDER_DATA_DATASET_ID, measureCode));
                const rawProviderDetailsArray = await Promise.all(detailedPromisesProviderData);
                const providerData: SortbyMedicareScores[] = rawProviderDetailsArray.map((item) => {
                    const rawData = item.providers[0];
                    return { H_001_01_OBSERVED: rawData.score }; // map the score to be named what i wanna name it
                });

                // combine the two sets of data to make the CardData objects
                const combinedCardData: CardData[] = generalHospiceData.map((generalItem, index) => {
                    // Get the corresponding item from the providerData array
                    const sortItem = providerData[index];

                    // Create the new combined object that matches your CardData type
                    return {
                        general_data: generalItem,
                        sortby_medicare_scores: sortItem
                    };
                });                

                console.log(combinedCardData);

                if (sortBy === "name") {
                    combinedCardData.sort(SortByName);
                } else if (sortBy === "care_prefrences") {
                    // we need data outside the General Data dataset
                    combinedCardData.sort(SortByCarePrefrence);
                }

                // Set the final data into your component's state
                setHospiceDisplayData(combinedCardData);

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
                        <Link key={facility?.general_data.cms_certification_number_ccn} href={`/details/${facility?.general_data.cms_certification_number_ccn}`}>
                            <div
                                className="bg-white/10 border border-white/20 rounded-lg p-6 hover:bg-white/15 hover:border-white/30 transition cursor-pointer"
                            >
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {facility?.general_data.facility_name}
                                </h3>
                                <p className="text-gray-300 mb-3">
                                    {facility?.general_data.ownership_type}
                                </p>
                                <p className="text-gray-300 mb-3">
                                    {facility?.general_data.telephone_number}
                                </p>
                                <p className="text-gray-300 mb-3">
                                    {facility?.sortby_medicare_scores.H_001_01_OBSERVED}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
