import CategoryCard from "@/components/details/category-card";
import { EnrichedProviderData } from "@/lib/types";
import { conditionsTreated, familyCaregiverExperience, locationCare, qualityPatientCare } from "./page";

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
                .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
            }/>
            <CategoryCard title="Location of care" measures={ 
              data.measures
                .filter((measure) => locationCare.includes(measure.measureCode))
                .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
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