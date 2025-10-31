"use client"

import { GetCodeDetails } from "@/lib/get-code-details";
import { Code } from "@/lib/types";
import { useEffect, useState } from "react";

type SortDropdownProps = {
    selectedValue: string;
    onSortChange: (newSortValue: string, newCode: Code) => void;
};

export default function SortDropdown({ selectedValue, onSortChange }: SortDropdownProps) {
    // We still need the array for mapping the <option> elements
    const [measureCodes, setMeasureCodes] = useState<Code[]>([]);
    
    // **NEW: State to hold our fast-lookup map**
    const [measureCodeMap, setMeasureCodeMap] = useState<Map<string, Code>>(new Map());
    
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedMeasureCode = event.target.value;
        
        // **BETTER: Use the Map for an O(1) lookup**
        const measureCodeObject = measureCodeMap.get(selectedMeasureCode);

        // The logic is the same, but the lookup was instant
        if (measureCodeObject) {
            onSortChange(selectedMeasureCode, measureCodeObject);
        }
    };

    useEffect(() => {
        const fetchCodes = async () => {
            const codes = await GetCodeDetails("opt_sorting");
            setMeasureCodes(codes);

            // **NEW: Build the map once the codes are fetched**
            const newMap = new Map<string, Code>();
            for (const code of codes) {
                newMap.set(code.measure_code, code);
            }
            setMeasureCodeMap(newMap);
        };
        fetchCodes();
    }, []);

    return (
        <select 
            value={selectedValue} 
            onChange={handleChange}
            className="p-2 rounded-md bg-background-alt border border-foreground-alt text-foreground max-w-[250px] max-h-[50px] overflow-x-auto font-sans"
        >
            <option value="" className="text-foreground font-sans">
                Name
            </option>
            {measureCodes.map((option, index) => (
                <option 
                    key={index} 
                    value={option.measure_code} // Value must be the string ID
                    className="text-foreground font-sans"
                >
                    {option.real_desc}
                </option>
            ))}
        </select>
    );
}