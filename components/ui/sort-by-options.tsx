"use client"

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

// Define the props our component will accept
type SortDropdownProps = {
    selectedValue: string;
    onSortChange: (newSortValue: string) => void;
};

type Option = {
    code: string,
    real_desc: string
}

export default function SortDropdown({ selectedValue, onSortChange }: SortDropdownProps) {
    const [measureCodes, setMeasureCodes] = useState<Option[]>([]);
    
    // This function runs when the user selects a new option
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // It calls the function passed down from the parent
        // to update the parent's state
        onSortChange(event.target.value);
    };

    const supabase = createClient();
    useEffect(() => {
        const fetchOptions = async () => {
            const { data: sortOptions, error: sortOptionsError } = await supabase.from('sort_options').select('measure_code,description');
            if (sortOptionsError) {
                console.error("Error fetching sorting options", sortOptionsError);
            }

            // we have to do a bunch of bullshit to get the associated codes with their real description
            if (sortOptions) {
                const optionsPromises: Promise<Option | null>[] = sortOptions.map( async (givenOption) => {
                    // get the associated 'real' descriptions for each code
                    const { data: codeDetails, error: codeDetailsError } = await supabase.from("measure_codes").select("real_desc").eq("measure_code", givenOption.measure_code).eq("description", givenOption.description).single();

                    if (codeDetailsError || !codeDetails) {
                        console.error("Error fetching code details", codeDetailsError);
                        return null;
                    }

                    const newOption: Option = {
                        code: givenOption.measure_code,
                        real_desc: codeDetails.real_desc
                    }
                    return newOption;
                });

                const resolvedOptions = await Promise.all(optionsPromises);

                // Filter out any 'null' values from the results
                //    The type of 'finalOptions' is now correctly 'Option[]'
                const finalOptions = resolvedOptions.filter(
                    (option): option is Option => option !== null
                );

                setMeasureCodes(finalOptions);
            }
        };
        fetchOptions();
        
    }, [supabase]);

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
                    key={option.code} 
                    value={option.code}
                    className="text-foreground" // Options often need their own color
                >
                    {option.real_desc}
                </option>
            ))}
        </select>
    );
}