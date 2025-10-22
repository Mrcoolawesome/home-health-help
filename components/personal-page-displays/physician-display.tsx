import { createClient } from "@/lib/supabase/server";
import { PersonalPageDisplayProps } from "@/lib/types";
import Link from "next/link";

export default async function PhysicianDisplay({ id }: PersonalPageDisplayProps) {
    const supabase = await createClient();

    const {data: physicianData, error: fetchPhysicianError } = await supabase
        .from("users_doctors")
        .select("id, name, specialization, referral_status, county")
        .eq("id", id)
        .single();

    if (fetchPhysicianError) {
        console.error("Error fetching physician data", fetchPhysicianError);
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white/10 border border-red-500/50 rounded-lg p-8 text-center">
                    <p className="text-red-400 font-medium mb-4">Physician not found</p>
                    <p className="text-gray-300 text-sm mb-6">Sorry, the physician's page could not be found.</p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
                    >
                        Back to Physicians
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8"
                >
                    <span>←</span>
                    <span>Back to Physicians</span>
                </Link>

                {/* Main Profile Card */}
                <div className="bg-white/10 border border-white/20 rounded-lg p-8 md:p-12">
                    {/* Header Section */}
                    <div className="mb-8 pb-8 border-b border-white/10">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {physicianData.name}
                        </h1>
                        <p className="text-xl text-gray-300">
                            {physicianData.specialization}
                        </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* County Info */}
                        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                Location
                            </h3>
                            <p className="text-2xl font-bold text-white">
                                {physicianData.county}
                            </p>
                        </div>

                        {/* Referral Status */}
                        <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                Referral Status
                            </h3>
                            {physicianData.referral_status ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <p className="text-xl font-bold text-green-300">
                                        Accepting Referrals
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                                    <p className="text-xl font-bold text-gray-300">
                                        Not Accepting Referrals
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CTA Section */}
                    {physicianData.referral_status && (
                        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-6 text-center">
                            <p className="text-gray-300 mb-4">
                                Interested in partnering with this physician?
                            </p>
                            <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition">
                                Contact Physician
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
