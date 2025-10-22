import type { EnrichedProviderMeasure } from '@/lib/types';

export type MeasureCategory =
  | 'Family/Caregiver Experience'
  | 'Pain & Symptom Management'
  | 'Quality of Care'
  | 'Care Processes';

export interface CategorizedMeasures {
  'Family/Caregiver Experience': EnrichedProviderMeasure[];
  'Pain & Symptom Management': EnrichedProviderMeasure[];
  'Quality of Care': EnrichedProviderMeasure[];
  'Care Processes': EnrichedProviderMeasure[];
}

/**
 * Categorizes measures based on their name or code
 */
export function categorizeMeasures(
  measures: EnrichedProviderMeasure[]
): CategorizedMeasures {
  const categorized: CategorizedMeasures = {
    'Family/Caregiver Experience': [],
    'Pain & Symptom Management': [],
    'Quality of Care': [],
    'Care Processes': [],
  };

  measures.forEach((measure) => {
    const name = measure.measureName.toLowerCase();
    const code = measure.measureCode.toLowerCase();

    // Categorize based on keywords in name or code
    if (
      name.includes('communication') ||
      name.includes('family') ||
      name.includes('caregiver') ||
      name.includes('spiritual') ||
      name.includes('emotional') ||
      code.includes('comm') ||
      code.includes('fam')
    ) {
      categorized['Family/Caregiver Experience'].push(measure);
    } else if (
      name.includes('pain') ||
      name.includes('symptom') ||
      name.includes('dyspnea') ||
      name.includes('nausea') ||
      name.includes('constipation') ||
      name.includes('treatment burden') ||
      code.includes('pain') ||
      code.includes('symptom')
    ) {
      categorized['Pain & Symptom Management'].push(measure);
    } else if (
      name.includes('quality') ||
      name.includes('care reviewed') ||
      name.includes('discharge') ||
      code.includes('qual') ||
      code.includes('review')
    ) {
      categorized['Quality of Care'].push(measure);
    } else {
      // Default to Care Processes for uncategorized
      categorized['Care Processes'].push(measure);
    }
  });

  return categorized;
}
