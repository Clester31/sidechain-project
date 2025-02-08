"use client";

import { useState } from "react";
import { signUpWithEmail } from "../auth";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const router = useRouter();

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            //toast error
            return;
        }
        //sign up
        signUpWithEmail(email, userName, password);
        router.push("/listen");
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-4">
            <div className="flex flex-col w-1/3 bg-gray-100 p-8 rounded">
                <h1 className="text-center mb-4">Sign up for an account</h1>
                <input
                    type="text"
                    placeholder="Username"
                    className="rounded-md px-4 py-2 bg-gray-200 text-black mb-4"
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Email"
                    className="rounded-md px-4 py-2 bg-gray-200 text-black mb-4"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="rounded-md px-4 py-2 bg-gray-200 text-black mb-4"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="rounded-md px-4 py-2 bg-gray-200 text-black mb-4"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    className='flex px-4 py-1 rounded bg-main_1 text-white h-16 text-xl w-1/2 items-center justify-center m-auto hover:bg-main_2 transition 250 ease-in-out'
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>
            </div>
            <div>
                <h1 className="text-main_2" onClick={() => router.push('/login')}>Log in instead</h1>
            </div>
        </div>
    );
}