import DoctorCards from "@/components/cards/hospice-display-cards";
import { LogoutButton } from "@/components/buttons/logout-button";

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Doctor Dashboard</h1>
            <p className="text-gray-300 mt-2">Manage your profile and referral partnerships</p>
          </div>
          <LogoutButton />
        </div>

        <div className="bg-white/10 border border-white/20 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Physician Listings</h2>
          <DoctorCards page={0} />
        </div>
      </div>
    </div>
  );
}
