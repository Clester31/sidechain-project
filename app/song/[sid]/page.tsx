"use client"

import { fetchSong, fetchUserInfo } from "@/app/auth";
import SongContainer from "@/app/components/song/SongContainer";
import { useAuth } from "@/app/lib/AuthContext";
import { Song, User } from "@/app/types";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function SongPage() {
    const { user } = useAuth();

    const params = useParams();
    const songId = Array.isArray(params.sid) ? params.sid[0] : params.sid || ''

    const [userId, setUserId] = useState<string>('no_id');
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [song, setSong] = useState<Song | null>(null);

    useEffect(() => {
        if (user) {
            setUserId(user.uid);
        }

        function fetchUserSong() {
            fetchSong(songId).then((song) => {
                if (song) {
                    setSong(song);
                }
            })
        }

        function fetchInfo() {
            if (user) {
                fetchUserInfo(userId).then((fetchedUserInfo) => {
                    if (fetchedUserInfo) {
                        setUserInfo(fetchedUserInfo);
                    }
                })
            }
        }

        fetchUserSong();
        fetchInfo();
    }, [user, userId, songId])

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-8">
            <div className="w-2/3">
                {song && userInfo && <SongContainer loggedInUserID={userId} userInfo={userInfo} songInfo={song} />}
            </div>
        </div>
    )
}