"use client"

import { useEffect, useState } from "react";
import { getUser } from "@/lib/get-user/get-user"; // Ensure this is the client version
import { LogoutButton } from "../buttons/logout-button";
import SignupButton from "../buttons/signup-button";
import LoginButton from "../buttons/login-button";

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
        <div className="flex flex-row justify-between">
            {isAuthenticated ? (
                <LogoutButton />
            ) : (
                <div>
                    <SignupButton />
                    <LoginButton />
                </div> 
            )}
        </div>
    );
}