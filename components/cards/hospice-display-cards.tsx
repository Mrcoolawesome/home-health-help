"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { CardData } from "@/lib/types";
import { DisplayCardData } from "@/lib/hospice-data/get-displaycard-data";

type Props = {
    page: number,
    zip: string,
    sortBy: string
}

export default function HospiceCards({ page, zip, sortBy }: Props) {
    const [hospiceDisplayData, setHospiceDisplayData] = useState<CardData[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchHospices = async () => {
            try {
                // get the card data based on the zip and how we're sorting it
                const cardData = await DisplayCardData(zip, sortBy);

                // Set the final data into your component's state
                setHospiceDisplayData(cardData);

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
                    <p>No hospices found! Please check your zipcode to see if it's correct.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {hospiceDisplayData.map((facility) => (
                        <Link key={facility?.general_data.cms_certification_number_ccn} href={`/details/${facility?.general_data.cms_certification_number_ccn}`}>
                            <div
                                className="bg-backround border border-foreground-alt rounded-lg p-6 hover:bg-background-alt transition cursor-pointer hover:ring-2 hover:ring-primary"
                            >
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    {facility?.general_data.facility_name}
                                </h3>
                                <p className="text-foreground-alt mb-3">
                                    {facility?.general_data.ownership_type}
                                </p>
                                <p className="text-foreground-alt mb-3">
                                    {facility?.general_data.telephone_number}
                                </p>
                                <p className="text-foreground-alt mb-3">
                                    {facility.sortby_medicare_scores.score_desc}: {facility?.sortby_medicare_scores.score}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
