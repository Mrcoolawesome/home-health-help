import { GetCmsByZip } from "./get-cms-by-zip";
import { GetProviderData } from "./get-provider-card-data";
import { GetSortbyData } from "../sortby-functions/get-sortby-data";
import { GeneralData, SortbyMedicareScores, CardData, sortOptions } from "../types";
import { Sort } from "../sortby-functions/sortby-functions";

type HospiceProvider = {
    // Since the key is a string with spaces, it must be in quotes
    "cms_certification_number_ccn": string;
};

type CmsApiResponse = {
  providers: HospiceProvider[];
};

const GENERAL_DATA_DATASET_ID = '25a385ec-f668-500d-8509-550a8af86eff'; // Hospice - General Data
const PROVIDER_DATA_DATASET_ID = "098c6cc4-7426-5407-aae1-b361fc2072d6"; // Hospice - Provider Data
/**
 * HOW TO ADD MORE THINGS TO SORT BY:
 * * You first need to add a new parameter to the type SortbyMedicareScores preferribly named the same code that they name it by.
 * * Then, you need to add that same code to the 
 */
// takes in the given zipcode, then the thing to sort by
export async function DisplayCardData(zip: string, sortBy: string) {
    const hospicesData: CmsApiResponse = await GetCmsByZip(zip);
    const cmsNumberList = hospicesData.providers.map(provider => provider['cms_certification_number_ccn']);

    // Fetch all details in parallel
    // Assumes getProviderDetailsByCcn(ccn) fetches the detailed data for one provider
    const desiredGeneralData = "cms_certification_number_ccn,facility_name,address_line_1,citytown,countyparish,state,telephone_number,ownership_type";
    const detailedPromisesGeneralData = cmsNumberList.map(ccn => GetProviderData(desiredGeneralData, ccn, GENERAL_DATA_DATASET_ID));
    const rawGeneralDetailsArrays = await Promise.all(detailedPromisesGeneralData);

    // SIMPLIFIED STEP: Just extract the provider object from each API response
    const generalHospiceData: GeneralData[] = rawGeneralDetailsArrays.map(
        // For each item in the main array...
        // 1. Access the .providers property to get the inner array.
        // 2. Access the first element [0] to get the final object.
        // 3. The arrow function implicitly returns this object.
        (item) => item.providers[0]
    );

    // the sortBy string will be the specific code you wanna compare to OR it's the others that are just sorting from the general dataset
    // if they're sorting from the general dataset, just make the measureCode default to showing their respect of care prefrences
    let measureCode = "";
    if (sortBy === "facility_name") {
        measureCode = sortOptions[1].value; // just leave this to make it a default value
    } else {
        measureCode = sortBy;
    }

    // im making the desiredData a parameter because in the future when we do cahps stuff and reuse this GetSortbyData function
    const desiredProviderData = "score";
    const detailedPromisesProviderData = cmsNumberList.map(ccn => GetSortbyData(desiredProviderData, ccn, PROVIDER_DATA_DATASET_ID, measureCode));
    const rawProviderDetailsArray = await Promise.all(detailedPromisesProviderData);
    const providerData: SortbyMedicareScores[] = rawProviderDetailsArray.map((item) => {
        const rawData = item.providers[0];
        // make the score what we've named it 
        return { 
            score: rawData.score,
            score_desc: sortOptions.find(option => option.value === measureCode)?.label
        }; 
    });

    // combine the two sets of data to make the CardData objects
    const combinedCardData: CardData[] = generalHospiceData.map((generalItem, index) => {
        // Get the corresponding item from the providerData array
        const sortItem = providerData[index];

        // Create the new combined object that matches your CardData type
        return {
            general_data: generalItem,
            sortby_medicare_scores: sortItem
        };
    });                

    Sort(combinedCardData, sortBy);

    return combinedCardData;
}