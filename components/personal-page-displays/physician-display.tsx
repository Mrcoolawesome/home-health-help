import { createClient } from "@/lib/supabase/server";
import { PersonalPageDisplayProps } from "@/lib/types";

export default async function PhysicianDisplay({ id }: PersonalPageDisplayProps) {
    const supabase = await createClient();

    const {data: physicianData, error: fetchPhysicianError } = await supabase
        .from("users_doctors")
        .select("id, name, specialization, referral_status, county")
        .eq("id", id)
        .single();
    
    if (fetchPhysicianError) {
        console.error("Error fetching physician data", fetchPhysicianError);
        return (
            <div className="p-4 rounded-md bg-destructive/10 text-destructive-foreground">
                <p>Sorry, the physician's page could not be found.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div>
                {physicianData.name}
            </div>
            <div>
                {physicianData.specialization}
            </div>
            <div>
                {physicianData.referral_status}
            </div>
            <div>
                {physicianData.county}
            </div>
        </div>
    );
}