import { getCmsData } from "@/lib/hospice-data/get-cms-data";

export async function GetSortbyData(desiredStuff: string, ccn: string, datasetId: string, measureCode: string) {
    const query = `[SELECT ${desiredStuff} FROM ${datasetId}][WHERE cms_certification_number_ccn = "${ccn}"][WHERE measure_code = "${measureCode}"]`;

    const response = await getCmsData(query);

    return response.json();
}