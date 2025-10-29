import { GetCmsData } from "@/lib/hospice-data/get-cms-data";

export async function GetProviderData(desiredStuff: string, ccn: string, datasetId: string) {
    const query = `[SELECT ${desiredStuff} FROM ${datasetId}][WHERE cms_certification_number_ccn = "${ccn}"]`;

    const response = await GetCmsData(query);

    return response.json();
}

// get's the score data from both cahps and the general medicare datatset
export async function GetProviderScoreData(ccn: string, measureCode: string) {
    // try the basic provider dataset first
    const GENERAL_PROVIDER_DATA_DATASET_ID = "098c6cc4-7426-5407-aae1-b361fc2072d6"; // Hospice - Provider Data
    const basicDataQuery = `[SELECT score FROM ${GENERAL_PROVIDER_DATA_DATASET_ID}][WHERE cms_certification_number_ccn = "${ccn}"][WHERE measure_code = "${measureCode}"]`;

    // get the response
    const basicDataResponse = await GetCmsData(basicDataQuery);
    const basicData = await basicDataResponse.json();

    // if fetching the basic data didn't error, then return it
    if (!basicData.error) {
        return basicData;
    }

    // if fetching the basicData didn't work, then fetch the cahps provider data
    const CAHPS_PROVIDER_DATA_DATASET_ID = "af93e008-23b4-563d-bacc-0be0708a8861"; // Hospice - Provider CAHPS
    const cahpsDataQuery = `[SELECT score FROM ${CAHPS_PROVIDER_DATA_DATASET_ID}][WHERE cms_certification_number_ccn = "${ccn}"][WHERE measure_code = "${measureCode}"]`;

    // get the cahps response
    const cahpsDataResponse = await GetCmsData(cahpsDataQuery);
    const cahpsData = await cahpsDataResponse.json();

    // just return the data because it'll throw an error itself if it didn't work 
    return cahpsData;
}