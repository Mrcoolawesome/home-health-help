import { getCmsData } from "@/lib/hospice-data/get-cms-data";

export async function GetProviderData(desiredStuff: string, ccn: string, datasetId: string) {
    const query = `[SELECT ${desiredStuff} FROM ${datasetId}][WHERE cms_certification_number_ccn = "${ccn}"]`;

    const response = await getCmsData(query);

    return response.json();
}