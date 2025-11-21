import { GetCmsData } from "@/lib/hospice-data/get-cms-data";
import { PROVIDER_CAHPS_DATA, PROVIDER_DATA } from "../globals";
export async function GetProviderData(desiredStuff: string, ccn: string, datasetId: string) {
  const query = `[SELECT ${desiredStuff} FROM ${datasetId}][WHERE cms_certification_number_ccn = "${ccn}"]`;

  const response = await GetCmsData(query);

  return response.json();
}

// get's the score data from both cahps and the general medicare datatset
export async function GetProviderScoreData(ccn: string, measureCode: string) {
  // try the basic provider dataset first
  const basicDataQuery = `[SELECT score FROM ${PROVIDER_DATA}][WHERE cms_certification_number_ccn = "${ccn}"][WHERE measure_code = "${measureCode}"]`;

  // get the response
  const basicDataResponse = await GetCmsData(basicDataQuery);
  const basicData = await basicDataResponse.json();

  // need to determine if it found it or not.
  // the api won't just error if it can't find it, it'll just return an empty array.
  // hence GetCmsData will return an object with an array called 'providers' that will be empty
  let isInBasicData = false;
  if (basicData.providers.length > 0) {
    isInBasicData = true;
  }

  // if fetching the basic data didn't error, then return it
  if (isInBasicData) {
    return basicData;
  }

  // if fetching the basicData didn't work, then fetch the cahps provider data
  const cahpsDataQuery = `[SELECT score FROM ${PROVIDER_CAHPS_DATA}][WHERE cms_certification_number_ccn = "${ccn}"][WHERE measure_code = "${measureCode}"]`;

  // get the cahps response
  const cahpsDataResponse = await GetCmsData(cahpsDataQuery);
  const cahpsData = await cahpsDataResponse.json();

  // just return the data because it'll throw an error itself if it didn't work 
  return cahpsData;
}
