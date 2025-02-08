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
                <img src={userInfo.bannerPic} className="w-2/3 h-64" alt="profile banner" style={{ objectFit: 'cover' }} />
                <div className="absolute flex w-2/3 p-4">
                    <div className="flex flex-row items-center text-xl gap-8">
                        <img src={userInfo.profilePic} className="w-32 h-32 rounded-full" alt="profile" />
                        <h1 className="text-white bg-black/50 px-4 py-1 text-3xl">{userInfo.username}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}