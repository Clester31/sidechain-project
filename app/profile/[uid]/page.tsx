"use client"

import { fetchSongs, fetchUserInfo } from "@/app/auth";
import ProfileBanner from "@/app/components/profile/ProfileBanner";
import ProfileNav from "@/app/components/profile/ProfileNav";
import SongContainer from "@/app/components/song/SongContainer";
import { Song, User } from "@/app/types";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Profile() {
    const params = useParams();
    const uid = params.uid;
    const router = useRouter();

    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [navMode, setNavMode] = useState<string>('songs');

    const [userSongs, setUserSongs] = useState<Song[]>([]);
    const [userLikes, setUserLikes] = useState<Song[]>([]);
    const [userReposts, setUserReposts] = useState<Song[]>([]);

    useEffect(() => {
        function getInfo() {
            if (uid) {
                fetchUserInfo(Array.isArray(uid) ? uid[0] : uid).then(async fetchedUserInfo => {
                    if (fetchedUserInfo) {
                        setUserInfo(fetchedUserInfo);
                        const fetchedSongs = await fetchSongs(fetchedUserInfo.songs);
                        const fetchedLikes = await fetchSongs(fetchedUserInfo.likedSongs);
                        const fetchedReposts = await fetchSongs(fetchedUserInfo.reposts);
                        setUserSongs(fetchedSongs);
                        setUserLikes(fetchedLikes);
                        setUserReposts(fetchedReposts);
                    }
                });
            }
        }
        getInfo();
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
                        <div className="text-2xl">
                            <h1 className="my-4">Songs</h1>
                            {
                                userSongs.map((song, idx) => {
                                    return (
                                        <SongContainer key={idx} songInfo={song} />
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