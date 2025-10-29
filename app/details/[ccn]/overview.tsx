import CategoryCard from "@/components/details/category-card";
import { EnrichedProviderData, EnrichedProviderMeasure } from "@/lib/types";
import { sortByScoreGeneric } from "@/lib/sortby-functions/sortby-functions";

// Helper function to sort measures by score, using the generic sorting function
function sortByScore(a: EnrichedProviderMeasure, b: EnrichedProviderMeasure): number {
  return sortByScoreGeneric(a, b, (measure) => measure.score);
}

export default function Overview({ data } : { data: EnrichedProviderData }) {
  return (
    <div className="container mx-auto w-full px-4 py-8 space-y-8">
      
      {/* Quality Measures Section */}
      <section className="rounded-lg border border-foreground-alt bg-background text-foreground p-6">
        <h2 className="text-xl font-semibold mb-4">Quality Measures</h2>
        {data.measures.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            <CategoryCard title="Conditions treated" measures={ 
              data.measures
                .filter((measure) => measure.conditions_treated)
                .sort(sortByScore)
            }/>
            <CategoryCard title="Location of care" measures={ 
              data.measures
                .filter((measure) => measure.location_of_care)
                .sort(sortByScore)
            }/>
            <CategoryCard title="Family/Caregiver Experience" measures={ 
              data.measures.filter((measure) => measure.family_caregiver_experience) 
            }/>
            <CategoryCard title="Quality of patient care" measures={ 
              data.measures.filter((measure) => measure.quality_patient_care) 
            }/>
            <CategoryCard title="All" measures={data.measures}/>
          </div>
        ) : (
          <p className="text-sm text-foreground-alt italic">No quality measures available</p>
        )}
      </section>
    </div>
  )
}