import { ZIP_DATA } from "../globals";
import { GetCmsData } from "./get-cms-data";

// This is the route that get's the providers CMS number's that work within a zip code area
// We need to make it clear that this will show a list of providers that work within the spcified zip-code
export async function GetCmsByZip(zip: string) {

    // 1. Define the CMS API constants
    // this is where we specify what data we want via SQLish syntax
    // NOTE: if it has to get too much stuff at once it might just error, but like theres never more than like a dozen
    // hospices operating in the same zip code so it should be fine to not have to put a limit on this
    const query = `[SELECT cms_certification_number_ccn FROM ${ZIP_DATA}][WHERE zip_code = "${zip}"]`;

    // this does error handling so we don't have to do it here (yeah i think that's how that works)
    const response = await GetCmsData(query);

    return response.json();

}
