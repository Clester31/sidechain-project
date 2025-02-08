/* eslint-disable @next/next/no-img-element */
import { User } from "@/app/types";

export default function ProfileBanner({ userInfo }:
    {
        userInfo: User;
    }
) {
    return (
        <div>
            <div className="relative flex justify-center items-center">
                <img src={userInfo.bannerPic} className="w-2/3" alt="profile banner" />
                <div className="absolute flex w-2/3 p-4">
                    <div className="flex flex-row items-center text-xl gap-8">
                        <img src={userInfo.profilePic} className="w-24 h-24 rounded-full" alt="profile" />
                        <h1 className="text-white bg-black/35 px-4 py-1 text-2xl">{userInfo.username}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}