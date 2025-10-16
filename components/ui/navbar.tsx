"use client"

import { useEffect, useState } from "react";
import { getUser } from "@/lib/get-user/get-user";
import { LogoutButton } from "../buttons/logout-button";
import SignupButton from "../buttons/signup-button";
import LoginButton from "../buttons/login-button";
import Link from "next/link";

export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { isAuthed, user } = await getUser();
            console.log(user);
            setIsAuthenticated(isAuthed);
        };

        fetchUser();
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-black/95 border-b border-white/10 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-row justify-between items-center h-16">
                    <Link href="/" className="text-xl font-bold text-white hover:text-gray-300 transition">
                        Find Referrals
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link href="/about" className="text-gray-300 hover:text-white transition font-medium">
                            About
                        </Link>
                        {isAuthenticated ? (
                            <LogoutButton />
                        ) : (
                            <div className="flex gap-3">
                                <SignupButton />
                                <LoginButton />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
