import { getCmsData } from "@/lib/cms-data/get-cms-data";

export async function GetProviderCardData(ccn: string) {
    const DATASET_ID = '25a385ec-f668-500d-8509-550a8af86eff'; // Hospice - Provider Data
    const query = `[SELECT cms_certification_number_ccn,facility_name,address_line_1,citytown,countyparish,state,telephone_number,ownership_type FROM ${DATASET_ID}][WHERE cms_certification_number_ccn = "${ccn}"]`;

    const response = await getCmsData(query);

    return response.json();
}