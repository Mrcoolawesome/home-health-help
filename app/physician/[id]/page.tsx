// This will be the physicians personal page that can be viewed by home health people
import PhysicianDisplay from "@/components/personal-page-displays/physician-display";
import { PersonalPageProps } from "@/lib/types";

export default async function PhysicianPersonalPage({ params } : PersonalPageProps) {
    const userId = (await params).id;

    return (
        <PhysicianDisplay id={userId} />
    );
}