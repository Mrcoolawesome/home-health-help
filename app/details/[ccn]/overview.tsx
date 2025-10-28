import CategoryCard from "@/components/details/category-card";
import { EnrichedProviderData, EnrichedProviderMeasure } from "@/lib/types";
import { sortByScoreGeneric } from "@/lib/sortby-functions/sortby-functions";
import { conditionsTreated, familyCaregiverExperience, locationCare, qualityPatientCare } from "./page";

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
                .filter((measure) => conditionsTreated.includes(measure.measureCode))
                .sort(sortByScore)
            }/>
            <CategoryCard title="Location of care" measures={ 
              data.measures
                .filter((measure) => locationCare.includes(measure.measureCode))
                .sort(sortByScore)
            }/>
            <CategoryCard title="Family/Caregiver Experience" measures={ 
              data.measures.filter((measure) => familyCaregiverExperience.includes(measure.measureCode)) 
            }/>
            <CategoryCard title="Quality of patient care" measures={ 
              data.measures.filter((measure) => qualityPatientCare.includes(measure.measureCode)) 
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