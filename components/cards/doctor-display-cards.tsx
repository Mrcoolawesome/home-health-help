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

// this expects page to be 0-indexed
export default function DoctorCards({ page }: Props) {
    const [doctorDisplayData, setDoctorDisplayData] = useState<DoctorData[]>([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const supabase = await createClient();

            const pageOffset = 10 * page;

            // just get 5 of the newest doctors for now, just select all the data for now
            const { data: doctorsData, error: fetchDoctorsError } = await supabase
            .from('users_doctors')
            .select()
            .order("created_at", { ascending: false })
            .range(pageOffset, pageOffset + 9); // 0-indexed so that's why we add only 9

            console.log(doctorsData);

            if (fetchDoctorsError) {
                console.error("Error fetching doctors:", fetchDoctorsError);
                return (
                    <div>
                        Error fetching doctor data.
                    </div>
                );
            }

            // if we get the data fine, then put it into the hook
            setDoctorDisplayData(doctorsData);
        };

        fetchDoctors();
    }, [page])
    
    return (
        <div id="doctor-display-box" className="flex flex-col">
            {doctorDisplayData.map((doctor) => (
                <div key={doctor?.id}>
                    <div id="doctor-name">
                        {doctor?.name}
                    </div>
                    <div id="doctor-specialization">
                        {doctor?.specialization}
                    </div>
                    {doctor?.referral_status ? (
                        <div id="referral-status">
                            "Looking for referral partners."
                        </div>
                ) : (<></>)}
                </div>
            ))}
        </div>
    );
}