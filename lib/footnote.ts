const footnotes: string[] = [
  "",
  "The number of eligible cases (stays, claims, etc.) is too small to report", //1
  "Data not available for this reporting period.", //2
  "Data suppressed by CMS upon request from the agency.", //3
  "Data not submitted for this reporting period.", //4
  "Results are based on a shorter time period than required. ", //5
  "The number of cases is too small to report.", //6
  "Results are based on a shorter time period than required.", //7
  "Data suppressed by CMS.", //8
  "There were discrepancies in the data collection process.", //9
  "None of the required data were submitted for this reporting period.", //10
  "Results aren’t available for this reporting period.", //11
  "Results aren’t available.", //12
  "Number of patients is too small to report.", //13
  "Value only reflects the specific year of data used for the current refresh, and does not mean a hospice has not provided care at this site in more recent years or is unable to provide care at this site.", //14
  "The number of cases is too small to report Star Ratings.", //15
  "The number of cases is too small to report a score for this state/territory.", //16
]

export function getFootnote(num: string): string {
  const index = parseInt(num);
  if (isNaN(index) || index < 0 || index >= footnotes.length) {
    return "";
  }
  return footnotes[index];
}