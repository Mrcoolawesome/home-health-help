"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCombinedProviderData } from "@/lib/hospice-data/provider-data";
import { ProviderData } from "@/lib/types";
import CategoryCard from "@/components/details/category-card";

export default function ComparePage() {
    const searchParams = useSearchParams();
    
    // Get all 'ccn' parameters from the URL
    const ccns = searchParams.getAll('ccn');
    const [providers, setProviders] = useState<(ProviderData | null)[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllProviders = async () => {
            setLoading(true);
            try {
                // Fetch all providers in parallel
                const providerPromises = ccns.map(ccn => getCombinedProviderData(ccn));
                const results = await Promise.all(providerPromises);
                setProviders(results);
            } catch (error) {
                console.error("Failed to fetch provider data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (ccns.length > 0) {
            fetchAllProviders();
        } else {
            setLoading(false);
        }
    }, [ccns.length]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold text-foreground mb-8">Compare Hospices</h1>
                    <p className="text-foreground-alt">Loading provider data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-foreground mb-8">Compare Hospices</h1>
                
                {ccns.length === 0 ? (
                    <div className="bg-background border border-foreground-alt rounded-lg p-6">
                        <p className="text-foreground-alt">No hospices selected for comparison.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Comparing {providers.filter(p => p !== null).length} Hospices</h2>
                        
                        {providers.map((provider, index) => (
                            <div key={ccns[index]} className="bg-background border border-foreground-alt rounded-lg p-6">
                                {provider ? (
                                    <CategoryCard title={provider.facilityName} measures={provider.measures}/>
                                ) : (
                                    <p className="text-red-400">Failed to load data for CCN: {ccns[index]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
