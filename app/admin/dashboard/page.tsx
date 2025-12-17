/**
 * I want this to be where they get redirected, and it makes them fill out their regular info, but then also makes them
 * select their correct location from google maps, so it get's their correct google places id, and their correct 
 * ccn from CMS given their exact address.
 */
import { AddUsers } from "@/components/forms/add-users-form";

// Website admins invite hospices
export default function Page() {
  return (
    <AddUsers invitedUserType="hospice" />
  );
}
