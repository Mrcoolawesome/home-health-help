import CategoryCard from "@/components/details/category-card";
import { EnrichedProviderData } from "@/lib/types";
import { familyCaregiverExperience, qualityPatientCare } from "./page";

export default function StateAvg({ data } : { data: EnrichedProviderData }) {
  return (
    <div className="container mx-auto w-full px-4 py-8 space-y-8">
      
      {/* Quality Measures Section */}
      <section className="rounded-lg border bg-card text-card-foreground p-6">
        <h2 className="text-xl font-semibold mb-4">Quality Measures</h2>
        {data.measures.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <CategoryCard title="Family/Caregiver Experience" measures={ 
              data.measures.filter((measure) => familyCaregiverExperience.includes(measure.measureCode)) 
            } compare="stateAverage"/>
            <CategoryCard title="Quality of patient care" measures={ 
              data.measures.filter((measure) => qualityPatientCare.includes(measure.measureCode)) 
            } compare="stateAverage"/>
            <CategoryCard title="All" measures={data.measures} compare="stateAverage"/>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">No quality measures available</p>
        )}
      </section>
    </div>
  )
}