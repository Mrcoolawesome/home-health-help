"use client"

import { GetCodeDetails } from "@/lib/get-code-details";
import { Code } from "@/lib/types";
import { useEffect, useState } from "react";

type SortDropdownProps = {
    selectedValue: string;
    onSortChange: (newSortValue: string, newCode: Code) => void;
    loading?: boolean;
};

type CategorizedCodes = {
    cahps: Code[];
    hci: Code[];
    generalMetric: Code[];
};

export default function SortDropdown({ selectedValue, onSortChange, loading }: SortDropdownProps) {
    // State to hold categorized codes
    const [categorizedCodes, setCategorizedCodes] = useState<CategorizedCodes>({
        cahps: [],
        hci: [],
        generalMetric: []
    });
    
    // State to hold our fast-lookup map
    const [measureCodeMap, setMeasureCodeMap] = useState<Map<string, Code>>(new Map());
    
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMeasureCode = event.target.value;
        
        // Use the Map for an O(1) lookup
        const measureCodeObject = measureCodeMap.get(selectedMeasureCode);

        if (measureCodeObject) {
            onSortChange(selectedMeasureCode, measureCodeObject);
        }
    };

    useEffect(() => {
        const fetchCodes = async () => {
            const codes = await GetCodeDetails("opt_sorting");
            
            // Categorize the codes
            const categorized: CategorizedCodes = {
                cahps: codes.filter(code => code.is_cahps),
                hci: codes.filter(code => code.is_hci),
                generalMetric: codes.filter(code => code.is_general_metric)
            };
            
            setCategorizedCodes(categorized);

            // Build the map once the codes are fetched
            const newMap = new Map<string, Code>();
            for (const code of codes) {
                newMap.set(code.measure_code, code);
            }
            setMeasureCodeMap(newMap);
        };
        fetchCodes();
    }, []);

    return (
        <div className="flex items-center gap-2">
            <select 
                value={selectedValue} 
                onChange={handleChange}
                disabled={loading}
                className="p-2 rounded-md bg-background-alt border border-foreground-alt text-foreground max-w-[250px] max-h-[50px] overflow-x-auto font-sans disabled:opacity-60"
            >
                <option value="" className="text-foreground font-sans">
                    Alphabetical Order
                </option>
                
                {/* CAHPS Category */}
                {categorizedCodes.cahps.length > 0 && (
                    <optgroup label="CAHPS (Patient Experience)" className="font-sans font-semibold">
                        {categorizedCodes.cahps.map((option) => (
                            <option 
                                key={option.measure_code} 
                                value={option.measure_code}
                                className="text-foreground font-sans"
                            >
                                {option.real_desc}
                            </option>
                        ))}
                    </optgroup>
                )}
                
                {/* HCI Category */}
                {categorizedCodes.hci.length > 0 && (
                    <optgroup label="HCI (Hospice Care Index)" className="font-sans font-semibold">
                        {categorizedCodes.hci.map((option) => (
                            <option 
                                key={option.measure_code} 
                                value={option.measure_code}
                                className="text-foreground font-sans"
                            >
                                {option.real_desc}
                            </option>
                        ))}
                    </optgroup>
                )}
                
                {/* General Metrics Category */}
                {categorizedCodes.generalMetric.length > 0 && (
                    <optgroup label="General Metrics" className="font-sans font-semibold">
                        {categorizedCodes.generalMetric.map((option) => (
                            <option 
                                key={option.measure_code} 
                                value={option.measure_code}
                                className="text-foreground font-sans"
                            >
                                {option.real_desc}
                            </option>
                        ))}
                    </optgroup>
                )}
            </select>
            {loading && (
                <span
                    aria-label="Loading"
                    className="h-5 w-5 animate-spin rounded-full border-2 border-foreground-alt border-t-primary"
                />
            )}
        </div>
    );
}