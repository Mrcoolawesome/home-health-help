import DoctorCards from "@/components/cards/doctor-display-cards";
import SearchBar from "@/components/ui/search-bar";

// This decides what their homepage should look like.
// If they're anonomous, then they see information about the website.
// If they're authed, then check if their user id is in the users_doctors table or the users_hh table to see 
// what type of user they are.
export default function Home() {
  return (
   <div className="flex flex-col">
      <SearchBar />
      <DoctorCards page={0} />
   </div>
  );
}
