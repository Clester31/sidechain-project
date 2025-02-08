"use client"

import { fetchSongs, fetchUserInfo } from "@/app/auth";
import ProfileBanner from "@/app/components/profile/ProfileBanner";
import ProfileNav from "@/app/components/profile/ProfileNav";
import SongContainer from "@/app/components/song/SongContainer";
import { useAuth } from "@/app/lib/AuthContext";
import { Song, User } from "@/app/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function Profile() {
    const { user } = useAuth();

    const params = useParams();
    const uid = params.uid;

    const [userId, setUserId] = useState<string>('no_id');
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [navMode, setNavMode] = useState<string>('songs');

    const [userSongs, setUserSongs] = useState<Song[]>([]);
    const [userLikes, setUserLikes] = useState<Song[]>([]);
    const [userReposts, setUserReposts] = useState<Song[]>([]);

    useEffect(() => {
        async function getInfo() {
            if (user) {
                setUserId(user.uid);
            }
            if (uid) {
                const fetchedUserInfo = await fetchUserInfo(Array.isArray(uid) ? uid[0] : uid);
                if (fetchedUserInfo) {
                    setUserInfo(fetchedUserInfo);
                    const fetchedSongs = await fetchSongs(fetchedUserInfo.songs);
                    const fetchedLikes = await fetchSongs(fetchedUserInfo.likedSongs);
                    const fetchedReposts = await fetchSongs(fetchedUserInfo.repostedSongs);
                    setUserSongs(fetchedSongs);
                    setUserLikes(fetchedLikes);
                    setUserReposts(fetchedReposts);
                }
            }
        }
        getInfo();
    }, [user, uid])

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
                                        <SongContainer key={idx} userInfo={userInfo} loggedInUserID={userId} songInfo={song} />
                                    )
                                })
                            }
                        </div>
                    )
                        :
                        navMode === 'likes' ? (
                            (
                                <div className="text-2xl">
                                    <h1 className="my-4">Likes</h1>
                                    {
                                        userLikes.map((song, idx) => {
                                            return (
                                                <SongContainer key={idx} userInfo={userInfo} loggedInUserID={userId} songInfo={song} />
                                            )
                                        })
                                    }
                                </div>
                            )
                        )
                            :
                            navMode === 'reposts' && (
                                <div className="text-2xl">
                                    <h1 className="my-4">Reposts</h1>
                                    {
                                        userReposts.map((song, idx) => {
                                            return (
                                                <SongContainer key={idx} userInfo={userInfo} loggedInUserID={userId} songInfo={song} />
                                            )
                                        })
                                    }
                                </div>
                            )
                }
            </div>
        </div>
    )
}