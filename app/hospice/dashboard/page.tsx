import { AddUsers } from "@/components/admin-dashboard/add-users";

// Hospice admin's invite marketers
export default function Page() {
  return (
    <AddUsers invitedUserType="marketer" />
  );
}
