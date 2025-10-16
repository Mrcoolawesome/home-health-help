"use client"

import DoctorCards from "@/components/cards/doctor-display-cards";
import SearchBar from "@/components/ui/search-bar";
import { useState, useEffect } from "react";
import { getUser } from "@/lib/get-user/get-user";
import Link from "next/link";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | undefined>("");

  useEffect(() => {
      const fetchUser = async () => {
          const { isAuthed, type } = await getUser();
          setIsAuthenticated(isAuthed);

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
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Hospice Referral Network
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Connect physicians and home health providers to streamline quality end-of-life care.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition text-lg"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition text-lg"
            >
              Learn More
            </Link>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Browse Physicians</h2>
            <p className="text-gray-300 mb-6">
              Log in as a home health provider to search and connect with physicians.
            </p>
            <SearchBar />
          </div>
        </div>
      </div>
    );
  } else if (userType === "doctor") {
    output = (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white/10 border border-white/20 rounded-lg p-8">
            <h1 className="text-4xl font-bold text-white mb-2">Doctor Dashboard</h1>
            <p className="text-gray-300 mb-8">Manage your profile and referral preferences.</p>
            <Link
              href="/doctor/profile"
              className="inline-block px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
            >
              Go to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (userType === "homeHealth") {
    output = (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-white mb-8">Provider Dashboard</h1>
          <p className="text-gray-300 mb-8">Search physicians and manage provider information.</p>
          <SearchBar />
          <DoctorCards page={0} />
        </div>
      </div>
    );
  } else {
    output = (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/10 border border-white/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Welcome</h2>
          <p className="text-gray-300 mb-6">Your account is authenticated but no role is set yet.</p>
          <Link
            href="/auth/sign-up"
            className="inline-block px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
          >
            Complete Setup
          </Link>
        </div>
      </div>
    );
  }

  return output;
}
