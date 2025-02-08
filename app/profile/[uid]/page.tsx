"use client"

import { fetchUserInfo } from "@/app/auth";
import ProfileBanner from "@/app/components/profile/ProfileBanner";
import ProfileNav from "@/app/components/profile/ProfileNav";
import { User } from "@/app/types";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Profile() {
    const params = useParams();
    const uid = params.uid;
    const router = useRouter();

    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [navMode, setNavMode] = useState<string>('songs');

    useEffect(() => {
        if (uid) {
            fetchUserInfo(Array.isArray(uid) ? uid[0] : uid).then(fetchedUserInfo => {
                if (fetchedUserInfo) {
                    setUserInfo(fetchedUserInfo);
                }
            });
        }
    })

    if (!userInfo) {
        return (
            <div>
                <h1>User Not Found</h1>
            </div>
        )
    }

    return (
        <div>
            <ProfileBanner userInfo={userInfo} />
            <ProfileNav setNavMode={setNavMode} />
            <div className="w-2/3 m-auto">
                {
                    navMode === 'songs' ? (
                        <div>
                            <h1>Songs</h1>
                            {
                                userInfo.songs.map((song, idx) => {
                                    return (
                                        <div key={idx}>
                                            <h1>{song}</h1>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                        :
                        navMode === 'likes' ? (
                            (
                                <div>
                                    <h1>Likes</h1>
                                </div>
                            )
                        )
                            :
                            navMode === 'reposts' && (
                                <div>
                                    <h1>Reposts</h1>
                                </div>
                            )
                }
            </div>
        </div>
    )
}