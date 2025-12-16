import { GetCmsByZip } from "./get-cms-by-zip";
import { GeneralData, SortbyMedicareScores, CardData, Code } from "../types";
import { Sort } from "../sortby-functions/sortby-functions";
import { GetCodeDesc } from "../get-code-details";
import { GetCmsData } from "@/lib/hospice-data/get-cms-data";
import { PROVIDER_CAHPS_DATA, PROVIDER_DATA, GENERAL_DATA } from "../globals";

type HospiceProvider = {
    // Since the key is a string with spaces, it must be in quotes
    "cms_certification_number_ccn": string;
};

/**
 * HOW TO ADD MORE THINGS TO SORT BY:
 * * You first need to add a new parameter to the type SortbyMedicareScores preferribly named the same code that they name it by.
 * * Then, you need to add that same code to the 
 */
// takes in the given zipcode, then the thing to sort by
export async function DisplayCardData(zip: string, measureCode: string, scoreData?: Code) {

    // 1. Directly await the data from the data fetching function
    const providerList: HospiceProvider[] = await GetCmsByZip(zip);

    // Fetch all details in parallel
    // Assumes getProviderDetailsByCcn(ccn) fetches the detailed data for one provider
    const desiredGeneralData = "cms_certification_number_ccn,facility_name,address_line_1,citytown,countyparish,state,telephone_number,ownership_type";
    const detailedPromisesGeneralData = providerList.map(provider =>
        // The variable name is changed to 'provider' for clarity, 
        // and we access the string property 'cms_certification_number_ccn'
        GetProviderData(desiredGeneralData, provider['cms_certification_number_ccn'], GENERAL_DATA)
    );
    const rawGeneralDetailsArrays = await Promise.all(detailedPromisesGeneralData);

    // SIMPLIFIED STEP: Just extract the provider object from each API response
    const generalHospiceData: GeneralData[] = rawGeneralDetailsArrays.map(
        // For each item in the main array...
        // 1. Access the .providers property to get the inner array.
        // 2. Access the first element [0] to get the final object.
        // 3. The arrow function implicitly returns this object.
        (item) => item[0]
    );

    // the sortBy string will be the specific code you wanna compare to OR it's the others that are just sorting from the general dataset
    // if they're sorting from the general dataset, just make the measureCode default to showing their respect of care prefrences
    if (measureCode === "") {
        measureCode = 'H_008_01_OBSERVED'; // just leave this to make it a default value
    }

    // get the description for what we're looking for
    const descriptionString = await GetCodeDesc(measureCode, "Facility observed rate");

    // this GetProviderScoreData gets score data from both the regular and cahps dataset
    const detailedPromisesProviderData = providerList.map(provider =>
        GetProviderScoreData(provider['cms_certification_number_ccn'], measureCode)
    );
    const rawProviderDetailsArray = await Promise.all(detailedPromisesProviderData);
    const providerData: SortbyMedicareScores[] = await Promise.all( // 2. Await Promise.all()
        rawProviderDetailsArray.map(async (item) => { // 3. Make the .map() callback 'async'

            const rawData = item[0];

            // 7. Return the final object. This is now correct.
            return {
                score: rawData.score,
                score_desc: descriptionString, // This is now a string!
            };
        })
    );

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

    // the score data will be undefined at the beginning so we need to account for that
    let out_of = "";
    let lower_is_better = false;
    if (scoreData) {
        out_of = scoreData.out_of;
        lower_is_better = scoreData.lower_is_better;
    }

    Sort(combinedCardData, out_of, lower_is_better);

    return combinedCardData;
}

// get's the score data from both cahps and the general medicare datatset
export async function GetProviderScoreData(ccn: string, measureCode: string) {
    // try the basic provider dataset first
    const basicDataQuery = `[SELECT score FROM ${PROVIDER_DATA}][WHERE cms_certification_number_ccn = "${ccn}"][WHERE measure_code = "${measureCode}"]`;

    // get the response
    const basicData = await GetCmsData(basicDataQuery);

    // need to determine if it found it or not.
    // the api won't just error if it can't find it, it'll just return an empty array.
    // hence GetCmsData will return an object with an array called 'providers' that will be empty
    let isInBasicData = false;
    if (basicData.length > 0) {
        isInBasicData = true;
    }

    // if fetching the basic data didn't error, then return it
    if (isInBasicData) {
        return basicData;
    }

    // if fetching the basicData didn't work, then fetch the cahps provider data
    const cahpsDataQuery = `[SELECT score FROM ${PROVIDER_CAHPS_DATA}][WHERE cms_certification_number_ccn = "${ccn}"][WHERE measure_code = "${measureCode}"]`;

    // get the cahps response
    return await GetCmsData(cahpsDataQuery);
}


export async function GetProviderData(desiredStuff: string, ccn: string, datasetId: string) {
    const query = `[SELECT ${desiredStuff} FROM ${datasetId}][WHERE cms_certification_number_ccn = "${ccn}"]`;

    return await GetCmsData(query);
}
