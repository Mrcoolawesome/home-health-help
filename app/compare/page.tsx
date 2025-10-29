"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCombinedProviderData } from "@/lib/hospice-data/provider-data";
import { ProviderData, ProviderMeasure } from "@/lib/types";
import Popout from "@/components/details/popout";
import { getFootnote } from "@/components/details/footnote";

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

    // Get all unique measure codes across all providers
    const getAllMeasureCodes = (): string[] => {
        const measureCodes = new Set<string>();
        providers.forEach(provider => {
            if (provider) {
                provider.measures.forEach(measure => {
                    measureCodes.add(measure.measureCode);
                });
            }
        });
        return Array.from(measureCodes).sort();
    };

    // Find a measure for a specific provider by measure code
    const findMeasure = (provider: ProviderData | null, measureCode: string): ProviderMeasure | undefined => {
        if (!provider) return undefined;
        return provider.measures.find(m => m.measureCode === measureCode);
    };

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

    if (ccns.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <h1 className="text-4xl font-bold text-foreground mb-8">Compare Hospices</h1>
                    <div className="bg-background border border-foreground-alt rounded-lg p-6">
                        <p className="text-foreground-alt">No hospices selected for comparison.</p>
                    </div>
                </div>
            </div>
        );
    }

    const measureCodes = getAllMeasureCodes();

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-full mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-foreground mb-8">Compare Hospices</h1>
              
                    <table className="w-full border-collapse border border-foreground-alt">
                        {/* Header row with hospice names */}
                        <thead>
                            <tr className="bg-muted">
                                <th className="border border-foreground-alt p-4 text-left font-semibold bg-background sticky top-[64px] left-0 z-20">
                                    Measure
                                </th>
                                {providers.map((provider, index) => (
                                    <th key={ccns[index]} className="border border-foreground-alt p-4 text-left font-semibold min-w-[200px] bg-background sticky top-[64px] z-10">
                                        {provider ? provider.facilityName : `Failed to load (${ccns[index]})`}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Row for each measure */}
                            {measureCodes.map((measureCode) => {
                                // Get the measure name from the first provider that has this measure
                                const firstMeasure = providers
                                    .map(p => findMeasure(p, measureCode))
                                    .find(m => m !== undefined);
                                
                                return (
                                    <tr key={measureCode} className="hover:bg-muted/50">
                                        <td className="border border-foreground-alt p-4 font-medium sticky left-0 bg-background">
                                            {firstMeasure?.measureName || measureCode}
                                        </td>
                                        {providers.map((provider, index) => {
                                            const measure = findMeasure(provider, measureCode);
                                            return (
                                                <td key={ccns[index]} className="border border-foreground-alt p-4">
                                                    {measure ? (
                                                        <div className="space-y-1">
                                                            {measure.starRating && !isNaN(Number(measure.starRating)) ? (
                                                                <div className="text-sm text-foreground-alt">
                                                                    ⭐ {measure.starRating}
                                                                </div>
                                                            ) : (
                                                                <div className="font-semibold">{measure.score}</div>
                                                            )}
                                                            {measure.footnote && (
                                                              <Popout description={getFootnote(measure.footnote)}>
                                                                <span className="text-primary underline">{measure.footnote}</span>
                                                              </Popout>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-foreground-alt">N/A</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
            </div>
        </div>
    );
}
