"use client"

import { GetCodeDetails } from "@/lib/get-code-details";
import { Code } from "@/lib/types";
import { useEffect, useState } from "react";

// Define the props our component will accept
type SortDropdownProps = {
    selectedValue: string;
    onSortChange: (newSortValue: string) => void;
};

export default function SortDropdown({ selectedValue, onSortChange }: SortDropdownProps) {
    const [measureCodes, setMeasureCodes] = useState<Code[]>([]);
    
    // This function runs when the user selects a new option
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // It calls the function passed down from the parent
        // to update the parent's state
        onSortChange(event.target.value);
    };

    useEffect(() => {
        const fetchCodes = async () => {
            const codes = await GetCodeDetails("opt_sorting");
            setMeasureCodes(codes);
        };
        fetchCodes();
    }, []);

    return (
        // The `select` element is the core of the dropdown.
        // We style it here with basic Tailwind classes.
        <select 
            value={selectedValue} 
            onChange={handleChange}
            className="p-2 rounded-md bg-background-alt border border-foreground-alt text-foreground"
        >
            {/* We map over our options array to create an <option> for each one */}
            {measureCodes.map(option => (
                <option 
                    key={option.measure_code} 
                    value={option.measure_code}
                    className="text-foreground" // Options often need their own color
                >
                    {option.real_desc}
                </option>
            ))}
        </select>
    );
}