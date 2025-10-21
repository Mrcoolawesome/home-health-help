export async function getNationalCahps() {
  try {
      const response = await fetch(`https://data.cms.gov/provider-data/api/1/datastore/sql?query=%5BSELECT%20%2A%20FROM%20cec9c15f-8712-5f08-ac05-918121f7c54d%5D`);
  
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return null;
      }
  
      const data = await response.json();
      console.log("National data:", data);
      return data;

    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Failed to fetch user data:", error);
      return null;
    }
}