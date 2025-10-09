import DoctorCards from "@/components/cards/doctor-display-cards";

export default function Home() {
  return (
   <div className="flex flex-col">
      <DoctorCards page={0} />
   </div>
  );
}
