import { AddUsers } from "@/components/forms/add-users-form";

// Hospice admin's invite marketers
export default function Page() {
  return (
    <AddUsers invitedUserType="marketer" />
  );
}
