"use server"

import { Code } from "./types";
import { createClient } from "./supabase/server";

export async function GetCodeDetails(tableName: string): Promise<Code[]> {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc('get_code_details', { 
        source_table: tableName // passing the arguement to the supabase function
    });

    if (error) {
        console.error(`Error fetching code details for table ${tableName}:`, error);
        return []; 
    }

    return data;
}

export async function GetCodeDesc(measure_code: string, desc: string): Promise<string> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("measure_codes")
        .select("real_desc") // we only want the real description
        .eq('measure_code', measure_code)
        .eq("description", desc)
        .single();

    // turn the description into a string so we can promise a string
    let descriptionString: string;
    if (error || !data) {
        console.error('Could not find description:', error);
        descriptionString = "Description not found"; // Fallback string
    } else {
        descriptionString = data.real_desc;
    }

    return descriptionString;
}