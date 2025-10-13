import DoctorCards from "@/components/cards/doctor-display-cards";
import { LogoutButton } from "@/components/buttons/logout-button";

export default function Home() {
  return (
   <div className="flex flex-col">
      <DoctorCards page={0} />
      <LogoutButton />
   </div>
  );
}