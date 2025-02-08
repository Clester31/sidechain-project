/* eslint-disable @next/next/no-img-element */
"use client"

import { fetchUserInfo } from "@/app/auth";
import { useAuth } from "@/app/lib/AuthContext"
import { User } from "@/app/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarUserSettings from "./NavbarUserSettings";

export default function Navbar() {
    const { user } = useAuth();
    const router = useRouter();

    const [userId, setUserId] = useState<string>('no_id');
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [openUserSettings, setOpenUserSettings] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            setUserId(user.uid);
            fetchUserInfo(userId).then(fetchedUserInfo => {
                if (fetchedUserInfo) {
                    setUserInfo(fetchedUserInfo);
                }
            }
            )
        }
    }, [user, userId])

    return (
        <div className="w-screen h-16 flex justify-between items-center border-b-4 border-main_2 hover:border-main_1 transition 250 ease-in-out cursor-pointer" onClick={() => setOpenUserSettings(false)}>
            <div className="w-64">
            <h1 className="text-2xl ml-4 font-bold transition-colors duration-250 ease-in-out hover:bg-gradient-to-r hover:from-main_1 hover:to-main_2 hover:text-transparent hover:bg-clip-text" onClick={() => router.push('/')}>Sidechain</h1>
            </div>

            <div className="text-xl flex justify-center text-center items-center">
            <button className="h-14 w-32 hover:bg-gray-100 transition 250 ease-in-out" onClick={() => router.push(`/listen`)}>Listen</button>
            <button className="h-14 w-32 hover:bg-gray-100 transition 250 ease-in-out" onClick={() => router.push(`/upload`)}>Upload</button>
            <button className="h-14 w-32 hover:bg-gray-100 transition 250 ease-in-out" onClick={() => router.push(`/profile/${userId}`)}>Profile</button>
            </div>
            <div className="w-64" onClick={(e) => e.stopPropagation()}>
            {
                user ?
                <div className="flex flex-row justify-end gap-4 mr-4">
                    <img src={userInfo?.profilePic} alt="profile picture" className="w-12 h-12 rounded-full hover:scale-105 transition 250 ease-in-out"
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenUserSettings(!openUserSettings);
                    }}
                    />
                </div>
                :
                <div className="flex flex-row gap-4 mr-4">
                    <button className='px-4 py-1 rounded bg-main_1 text-white w-24 hover:bg-main_2 transition 250 ease-in-out' onClick={() => router.push('/signup')}>Sign Up</button>
                    <button className='px-4 py-1 rounded bg-main_1 text-white w-24 hover:bg-main_2 transition 250 ease-in-out' onClick={() => router.push('/login')}>Log In</button>
                </div>
            }
            {openUserSettings && (
                <NavbarUserSettings />
            )}
            </div>
        </div>
    )
}