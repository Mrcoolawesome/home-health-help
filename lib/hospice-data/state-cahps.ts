export async function getStateCahps(state: string) {
  try {
    const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%20d215814b-bd51-5a4d-90a6-ed78c9cec898%5D%5BWHERE%20state%20%3D%20%22${state}%22%5D`);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    // Handle network errors or other exceptions
    console.error("Failed to fetch user data:", error);
    return null;
  }
}