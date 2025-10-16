"use client"

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type DoctorData = {
    id: string,
    name: string,
    specialization: string,
    referral_status: boolean
}

type Props = {
    page: number
}

export default function DoctorCards({ page }: Props) {
    const [doctorDisplayData, setDoctorDisplayData] = useState<DoctorData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            const supabase = await createClient();

            const pageOffset = 10 * page;

            const { data: doctorsData, error: fetchDoctorsError } = await supabase
            .from('users_doctors')
            .select()
            .order("created_at", { ascending: false })
            .range(pageOffset, pageOffset + 9);

            console.log(doctorsData);

            if (fetchDoctorsError) {
                console.error("Error fetching doctors:", fetchDoctorsError);
                setError("Error fetching doctor data.");
                return;
            }

            setDoctorDisplayData(doctorsData || []);
        };

        fetchDoctors();
    }, [page])

    if (error) {
        return <div className="max-w-4xl mx-auto px-4 py-8 text-red-400">{error}</div>;
    }

    return (
        <div id="doctor-display-box" className="max-w-4xl mx-auto px-4 py-8">
            {doctorDisplayData.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                    <p>No physicians found. Sign up to get started!</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {doctorDisplayData.map((doctor) => (
                        <div
                            key={doctor?.id}
                            className="bg-white/10 border border-white/20 rounded-lg p-6 hover:bg-white/15 hover:border-white/30 transition"
                        >
                            <h3 className="text-xl font-bold text-white mb-2">
                                {doctor?.name}
                            </h3>
                            <p className="text-gray-300 mb-3">
                                {doctor?.specialization}
                            </p>
                            {doctor?.referral_status && (
                                <div className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/50 text-green-300 rounded-full text-sm font-medium">
                                    ✓ Looking for referral partners
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
