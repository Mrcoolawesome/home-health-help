"use client"

import { GetCodeDetails } from "@/lib/get-code-details";
import { Code } from "@/lib/types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

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
    
    const handleSelection = (measureCode: string) => {
        if (measureCode === "") {
            // Reset to alphabetical
            onSortChange("", {} as Code);
        } else {
            const codeObject = measureCodeMap.get(measureCode);
            if (codeObject) {
                onSortChange(measureCode, codeObject);
            }
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

    // Get the display text for the selected option
    const getSelectedText = () => {
        if (!selectedValue) return "Alphabetical Order";
        const code = measureCodeMap.get(selectedValue);
        return code?.real_desc || "Select sorting option";
    };

    return (
        <div className="flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button 
                        variant="outline" 
                        disabled={loading}
                        className="w-full sm:w-auto min-w-[200px] justify-between gap-2"
                    >
                        <span className="truncate text-left flex-1">
                            {getSelectedText()}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                    align="end" 
                    className="w-[320px] sm:w-[400px] max-h-[400px] overflow-y-auto"
                >
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                        Sort by
                    </DropdownMenuLabel>
                    
                    {/* Default Option */}
                    <DropdownMenuItem
                        onClick={() => handleSelection("")}
                        className="cursor-pointer"
                    >
                        <Check 
                            className={cn(
                                "mr-2 h-4 w-4",
                                selectedValue === "" ? "opacity-100" : "opacity-0"
                            )} 
                        />
                        <span>Alphabetical Order</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    {/* CAHPS Category */}
                    {categorizedCodes.cahps.length > 0 && (
                        <>
                            <DropdownMenuLabel className="text-xs font-semibold text-foreground">
                                CAHPS (Patient Experience)
                            </DropdownMenuLabel>
                            {categorizedCodes.cahps.map((option) => (
                                <DropdownMenuItem
                                    key={option.measure_code}
                                    onClick={() => handleSelection(option.measure_code)}
                                    className="cursor-pointer pl-8"
                                >
                                    <Check 
                                        className={cn(
                                            "mr-2 h-4 w-4 absolute left-2",
                                            selectedValue === option.measure_code ? "opacity-100" : "opacity-0"
                                        )} 
                                    />
                                    <span className="text-sm">{option.real_desc}</span>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                        </>
                    )}
                    
                    {/* HCI Category */}
                    {categorizedCodes.hci.length > 0 && (
                        <>
                            <DropdownMenuLabel className="text-xs font-semibold text-foreground">
                                HCI (Hospice Care Index)
                            </DropdownMenuLabel>
                            {categorizedCodes.hci.map((option) => (
                                <DropdownMenuItem
                                    key={option.measure_code}
                                    onClick={() => handleSelection(option.measure_code)}
                                    className="cursor-pointer pl-8"
                                >
                                    <Check 
                                        className={cn(
                                            "mr-2 h-4 w-4 absolute left-2",
                                            selectedValue === option.measure_code ? "opacity-100" : "opacity-0"
                                        )} 
                                    />
                                    <span className="text-sm">{option.real_desc}</span>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                        </>
                    )}
                    
                    {/* General Metrics Category */}
                    {categorizedCodes.generalMetric.length > 0 && (
                        <>
                            <DropdownMenuLabel className="text-xs font-semibold text-foreground">
                                General Metrics
                            </DropdownMenuLabel>
                            {categorizedCodes.generalMetric.map((option) => (
                                <DropdownMenuItem
                                    key={option.measure_code}
                                    onClick={() => handleSelection(option.measure_code)}
                                    className="cursor-pointer pl-8"
                                >
                                    <Check 
                                        className={cn(
                                            "mr-2 h-4 w-4 absolute left-2",
                                            selectedValue === option.measure_code ? "opacity-100" : "opacity-0"
                                        )} 
                                    />
                                    <span className="text-sm">{option.real_desc}</span>
                                </DropdownMenuItem>
                            ))}
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
            
            {loading && (
                <span
                    aria-label="Loading"
                    className="h-5 w-5 animate-spin rounded-full border-2 border-foreground-alt border-t-primary shrink-0"
                />
            )}
        </div>
    );
}