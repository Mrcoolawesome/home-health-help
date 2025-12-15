# The plans for refactoring stuff
## The CMS api stuff
### Understanding the flow
 - `get-user` folder:
   - I use `get-user.ts` to get the user's data
   - `get-user-type.ts` to get the user type
 - `hospice-data` folder:
   - `actions.ts` - This calls `DisplayCardData` which is declared in `get-display-card-data`
      - From what I can tell this is just the main wrapper for using the `DisplayCardData` function
      - `get-display-card-data` - This is the main thing that get's the data from the CMS database
         - This uses a few things:
            - `GetProviderData` - this is declared in `get-provider-data.ts`, and it uses `GetCmsData` to get data based on a query containing the required stuff, the dataset id, and the hospice ccn.
               - `GetCmsData` - This is the actual thing that send the api call and returns the json response
         - It then uses `GetCodeDesc` to get our description of a specific code from our database.
            - This is declared in `get-code-details` 
            - This literally just gets the code based on its column name from the database
            - Returns it as a `Code` object
         - Then it uses `GetProviderScoreData` to get the score data from both the regular dataset and cahps dataset
         - Then it uses `Sort` to sort the cards based on what type of thing they're being compared against. 
            - This is declared in the `sortby-functions.ts` file. It has a bunch of different functions to help sort by different types of units
   - `enrich-provider-data.ts` - This holds all the functions that maps measure codes to provider data
      - `enrichProviderData` - This uses `createMeasureLookup` (declared in the same file) to make lookup tables based on all the different raw data given.
      - It also uses `createCodeLookup` (also declared in the same file) to make a lookup table for code objects based on measure codes. 
   - `get-cms-by-zip.ts` - I don't really think anything in this is used like at all so yeah we should get rid of it probably. 
   - `get-cms-data.ts` - This has `GetCmsData` which gets a response based on a given query to send to the CMS database. 
   - `get-enriched-provider-data.ts` 
      - `getEnrichedProviderData` - Get's a specific provider and enriches them by adding their national and state data to them for comparison. 
         - It does this by using the `enrichProviderData` function previously described.
   - `get-provider-data.ts` - This holds functions that fetch data for specic providers.
      - `GetProviderData` - this is just a wrapper for `GetCmsData` that just does all the boilerplate stuff for the query, so they just need to put in the desired data, ccn, and the datasetId.
      - `GetProviderScoreData` - This is the one that tries querying specifically for measureCodes between the basic data dataset and the cahps dataset. 
         - It uses `GetCmsData` to do this
   - `national-data.ts` - Holds the functions to get all the national datasets
   - `provider-data.ts` - Get's the provider data from chaps and not chaps datasets and combines the data from both sets into one object
   - `state-data.ts` - Has the functions to get basic and chaps state data.
   - `get-sortby-data.ts` - This has one function that get's the provider based on everything + their measure code
      - the function `GetSortByData` is literally just like the other Get functions and it's just a wrapper for `GetCmsData` so that it's easy to just put in the parameters the ccn, desired stuff, and datasetId.
   - 


