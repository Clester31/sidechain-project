/* eslint-disable @next/next/no-img-element */
"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "../lib/AuthContext";
import { User } from "@/app/types";
import { useEffect, useState } from "react";
import { fetchUserInfo, updateProfileBanner, updateProfilePicture, updateUsername } from "../auth";

export default function Settings() {
    const { user } = useAuth(); 

    const [userId, setUserId] = useState<string>('no_id');
    const [userInfo, setUserInfo] = useState<User | null>(null);

    const [newUsername, setNewUsername] = useState<string>('');
    const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
    const [profilePicDisplay, setProfilePicDisplay] = useState<string>('');
    const [newProfileBanner, setNewProfileBanner] = useState<File | null>(null);
    const [profileBannerDisplay, setProfileBannerDisplay] = useState<string>('');

    const changeUsername = () => {
        updateUsername(userId, newUsername);
        // react toast
    }

    const changeProfilePicture = () => {
        updateProfilePicture(userId, newProfilePicture);
        // react toast
    }

    const changeProfileBanner = () => {
        updateProfileBanner(userId, newProfileBanner);
        // react toast
    }

    useEffect(() => {
        if (user) {
            setUserId(user.uid);
            fetchUserInfo(Array.isArray(userId) ? userId[0] : userId).then(fetchedUserInfo => {
                if (fetchedUserInfo) {
                    setUserInfo(fetchedUserInfo);
                }
            })
        }
    }, [user, userId])

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 gap-4">
            <h1 className="text-2xl font-semibold">Settings</h1>
            <div className="flex flex-col bg-gray-100 p-8 rounded items-center justify-center w-1/2 text-xl gap-4">
                <h1>Change Username</h1>
                <div className="w-full flex justify-center">
                    <input type="text" placeholder={userInfo?.username} className="px-4 py-2 w-1/2" onChange={(e) => setNewUsername(e.target.value)} />
                    <button disabled={newUsername.length < 4} className="bg-main_1 px-4 py-1 text-white disabled:bg-teal-500/35" onClick={changeUsername}>Update</button>
                </div>
            </div>
            <div className="flex flex-col bg-gray-100 p-8 rounded items-center justify-center w-1/2 text-xl gap-4">
                <h1>Change Profile Picture</h1>
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="mb-4">
                        <img src={profilePicDisplay || userInfo?.profilePic} alt="profile picture" className="w-32 h-32 rounded-full bg-gray-200" />
                    </div>
                    <div>
                        <label className="bg-main_1 px-4 py-1 text-white cursor-pointer w-32">
                            <input type="file" className="hidden" onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setNewProfilePicture(file);
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setProfilePicDisplay(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }} />
                            Choose File
                        </label>
                        <button disabled={!newProfilePicture} className="bg-main_1 px-4 py-1 text-white disabled:bg-teal-500/35 ml-4 w-32" onClick={changeProfilePicture}>Update</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-gray-100 p-8 rounded items-center justify-center w-1/2 text-xl gap-4">
                <h1>Change Profile Banner</h1>
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="mb-4">
                        <img src={profileBannerDisplay || userInfo?.bannerPic} alt="profile banner" className="max-w-full max-h-48 object-contain"/>
                    </div>
                    <div>
                        <label className="bg-main_1 px-4 py-1 text-white cursor-pointer w-32">
                            <input type="file" className="hidden" onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setNewProfileBanner(file);
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setProfileBannerDisplay(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }} />
                            Choose File
                        </label>
                        <button disabled={!newProfileBanner} className="bg-main_1 px-4 py-1 text-white disabled:bg-teal-500/35 ml-4 w-32" onClick={changeProfileBanner}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}