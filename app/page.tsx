"use client"

import DoctorCards from "@/components/cards/doctor-display-cards";
import SearchBar from "@/components/ui/search-bar";
import { useState, useEffect } from "react";
import { getUser } from "@/lib/get-user/get-user";

// This decides what their homepage should look like.
// If they're anonomous, then they see information about the website.
// If they're authed, then check if their user id is in the users_doctors table or the users_hh table to see 
// what type of user they are.
export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | undefined>("");
  
  useEffect(() => {
      const fetchUser = async () => {
          // get the user and their information
          const { isAuthed, type } = await getUser();
          setIsAuthenticated(isAuthed);

          // if they definetly exist but somehow don't have a type then throw an error
          if (isAuthed && type === undefined) {
            console.error("Current user doesn't have a type somehow");
          }
          setUserType(type);
      };
      fetchUser();
  }, []);

  let output: React.ReactNode;

  if (!isAuthenticated) {
    output = (
      <div>
        <h1 className="text-2xl font-semibold">Hospice referral network</h1>
        <p className="text-muted-foreground">Connect physicians and home health providers.</p>
      </div>
    );
  } else if (userType === "doctor") {
    output = (
      <div>
        <h2 className="text-lg font-medium">Doctor Dashboard</h2>
        <p>Manage your profile and referral preferences.</p>
      </div>
    );
  } else if (userType === "homeHealth") {
    output = (
      <div>
        <h2 className="text-lg font-medium">Provider Dashboard</h2>
        <p>Search physicians and manage provider info.</p>
        <SearchBar />
        <DoctorCards page={0} />
      </div>
    );
  } else {
    // authenticated but type unknown
    output = (
      <div>
        <h2>Welcome</h2>
        <p>Your account is authenticated but no role is set somehow.</p>
      </div>
    );
  }

  return output;
}
