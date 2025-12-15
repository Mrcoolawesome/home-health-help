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
### Improvements that could be made
## Understanding the components folder
### The flow
 - `admin-dashboard`
   - `add-users.tsx` - This is the file that does the user invite based on a given user type.
 - `buttons`
   - `admin-dash-button.tsx` - This is the button that is used to access the admin-dashboard
   - `hospice-signup-button.tsx` - This is unused now and should be removed
   - `login-button.tsx` - Yep that's what it is 
   - `logout-button.tsx` - Ype that's what it is too
 - `cards`
   - `hospice-display-cards.tsx` - Given a zip, the sortby measure code, the score data for each provider, and if it's for the compare page or the homepage, it loops through and displays all the hospices in their cards. **It also takes in what page the homepage is on, but it doesn't do anything with that and we should do something about that.**
 - `home`
   - `home-client.tsx` - This takes in the user search and finds the hospices that serve their area, and it also handles the sorting stuff
      - **This should have the feature to search by name of the hospice**
   - `signup-forms`
      - `hospice-sign-up-form.tsx` 
         - This holds the function `SetPasswordHospice`
            - This function uses `SetHospicePassword` to set that hospice users password given the form data.
      - `marketer-sign-up-form.tsx`
         - Does the same thing as the hospice sign up form except it sets the password for them in the function itself because that's the only way i could get it to work. This is where all the **authentication bugs likely stem from**, however I really don't know how to fix that. 
   - ui
      - The only two that I know about that aren't really basic are the following:
      - `navbar.tsx` This is the main thing that gets the user to check if their authenticated and then determine what it should display based off the user's type.
      - `sort-by-options.tsx` - This is the component that holds all the dropdown menu items to sort by. It has all the code to change how each of the cards are setup.
   - Those without a folder to be put in:
      - `auth-button.tsx` - Should be put into the button folder
      - `forgot-password-form.tsx` - Should be put into form folder
      - `hospice-choose-location.tsx` - Should be put into form folder
      - `login-form` - form folder
      - `providers.tsx` - not really sure what this is and where it should go
      - `theme-switcher.tsx` - Probably the ui folder but I'm honestly not sure
      - `update-password-form.tsx` - not really sure if we still need this should figure that out
## My stupid endpoints
### How to eat the spaghetti
 - `set-password`
   - `hospice`
      - `page.tsx` 
         - Uses `ChooseLocation` to basically do everything. Page.tsx exists to return an error but it doesn't even have to do that.
            - This does everything for fetching google maps stuff and doing address autocomplete
            - This then has `SetPasswordHospice` as a component that replaces everything when they've put in their adress.
               - This is what sets their password and everything
   - `marketer`
      - `page.tsx` - This does all the password setting directly in the file rather than calling on other functions 

## What do we do about all this
 - The biggest thing I wanna do is get all the stuff in the `hospice-data` folder sorted out so that there's not redundant code anymore. 
 - Then I wanna organize the lib and components folder so that things are in places they should be. 
 - I also wanna make it so that the warning in the console that appears like a thousand times goes away.
 - If we can also host on a different service that'd be pretty epic I think. 
 - We also really should get all the CSS stuff working properly with like darkmode and everything, and so that it uses Zanes constants he setup in the globals.css file. 
 - It would also be cool if we made the about page look really epic instead of like not.
 - Another thing I could do is setup a form where they can submit feedback
 - We should also set it up so that when they put in their address and everything it actually displays their stuff on their specific page.

