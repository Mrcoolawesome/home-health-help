"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { CardData, Code } from "@/lib/types";
import { DisplayCardData } from "@/lib/hospice-data/get-displaycard-data";
import { useRouter } from "next/navigation";

type Props = {
    page: number,
    zip: string,
    sortBy: string,
    scoreData: Code
}

export default function HospiceCards({ page, zip, sortBy, scoreData }: Props) {
    const [hospiceDisplayData, setHospiceDisplayData] = useState<CardData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedCCNs, setSelectedCCNs] = useState<string[]>([]);
    const router = useRouter();
    
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

    const toggleSelection = (ccn: string) => {
        setSelectedCCNs(prev => {
            if (prev.includes(ccn)) {
                return prev.filter(id => id !== ccn)
            }
            if (prev.length < 5) {
                return [...prev, ccn];
            }

            return prev;
        })
    }

    const isSelected = (ccn: string) => selectedCCNs.includes(ccn);

    const handleCompare = () => {
        const params = new URLSearchParams();
        selectedCCNs.forEach(ccn => params.append('ccn', ccn));
        router.push(`/compare?${params.toString()}`);
    };

    if (error) {
        return <div className="max-w-4xl mx-auto px-4 py-8 text-red-400">{error}</div>;
    }

    // need to figure out what the score's out of
    let outOfDisplay = "";
    // this checks if scoreData exists first because it doesn't upon first load
    console.log(scoreData);
    if (scoreData && scoreData.out_of !== "N/A" && scoreData.out_of !== "yes/no") {
        // if the 'out_of' parameter is a number that means the score is #/that-given number
        const isOutOfANum = !isNaN(Number(scoreData.out_of));
        if (isOutOfANum) {
            outOfDisplay = `/${scoreData.out_of}`;
        } else {
            outOfDisplay = scoreData.out_of;
        }
    }

    return (
        <div id="hospice-display-box" className="max-w-4xl mx-auto px-4 py-8">
            {hospiceDisplayData.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                    <p>No hospices found! Please check your zipcode to see if it's correct.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {hospiceDisplayData.map((facility) => {
                        const ccn = facility?.general_data.cms_certification_number_ccn;
                        const selected = isSelected(ccn);
                        
                        return (
                            <div
                                key={ccn}
                                className={`bg-background border rounded-lg p-6 transition ${
                                    selected 
                                        ? 'border-primary ring-2 ring-primary' 
                                        : 'border-foreground-alt hover:bg-background-alt hover:ring-2 hover:ring-primary'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selected}
                                        onChange={() => toggleSelection(ccn)}
                                        disabled={!selected && selectedCCNs.length >= 5}
                                        className="mt-1 h-5 w-5 rounded border-foreground-alt cursor-pointer"
                                    />
                                    <Link href={`/details/${ccn}`} className="flex-1">
                                        <div className="cursor-pointer">
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
                                                {facility.sortby_medicare_scores.score_desc}: {facility?.sortby_medicare_scores.score}{outOfDisplay}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Floating Compare Bar */}
            {selectedCCNs.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground rounded-full shadow-lg px-6 py-3 flex items-center gap-4 z-50">
                    <span className="font-semibold">
                        {selectedCCNs.length} selected
                    </span>
                    <button
                        onClick={() => setSelectedCCNs([])}
                        className="text-sm underline hover:no-underline"
                    >
                        Clear
                    </button>
                    <button
                        onClick={handleCompare}
                        disabled={selectedCCNs.length < 2}
                        className="bg-background text-foreground px-4 py-2 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-background-alt transition"
                    >
                        Compare
                    </button>
                </div>
            )}
        </div>
    );
}
