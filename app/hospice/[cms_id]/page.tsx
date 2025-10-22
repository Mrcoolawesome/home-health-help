// This will be the physicians personal page that can be viewed by home health people
import PhysicianDisplay from "@/components/personal-page-displays/physician-display";
import { HospiceDisplayProps } from "@/lib/types";

export default async function HospiceDisplay({ params } : HospiceDisplayProps) {
    const hospiceCmsId = (await params).id;

    return (
        <PhysicianDisplay id={userId} />
    );
}