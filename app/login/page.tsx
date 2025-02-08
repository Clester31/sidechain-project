"use client"

import { useState } from "react";
import { logInWithEmail } from "../auth";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter();

    const handleSubmit = () => {
        if(!email || !password) {
            //toast error
            return;
        }
        logInWithEmail(email, password);
        router.push('/listen');
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-4">
            <div className="flex flex-col w-1/3 bg-gray-100 p-8 rounded">
                <h1 className="text-center mb-4">Log In</h1>
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
                <button
                    className='flex px-4 py-1 rounded bg-main_1 text-white h-16 text-xl w-1/2 items-center justify-center m-auto hover:bg-main_2 transition 250 ease-in-out'
                    onClick={handleSubmit}
                >
                    Log In
                </button>
            </div>
            <div>
                <h1 className="text-main_2" onClick={() => router.push('/signup')}>Sign Up Instead</h1>
            </div>
        </div>
    )
}