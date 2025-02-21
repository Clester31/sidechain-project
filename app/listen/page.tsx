"use client"

import { useEffect, useState } from "react";
import { Song, User } from "../types";
import { fetchRandomSong, fetchUserInfo } from "../auth";
import SongContainer from "../components/song/SongContainer";
import { useAuth } from "../lib/AuthContext";
import AskSignUp from "../components/profile/AskSignUp";

export default function Listen() {
    const { user } = useAuth();

    const [userId, setUserId] = useState<string>('no_id');
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [randomSong, setRandomSong] = useState<Song | null>(null);

    const updateCurrentSong = () => {
        fetchRandomSong().then((song) => {
            if(song) {
                setRandomSong(song);
            }
        })
    }

    useEffect(() => {
        if (user) {
            setUserId(user.uid);
            fetchUserInfo(userId).then((fetchedUserInfo) => {
                if (fetchedUserInfo) {
                    setUserInfo(fetchedUserInfo);
                }
            })
        }
        fetchRandomSong().then((song) => {
            if(song) {
                setRandomSong(song);
                //console.log(song);
            }
        })
    }, [user, userId])

    if (!userInfo) {
            return (
                <div className="flex justify-center items-center h-screen">
                    <AskSignUp />
                </div>
            )
        }

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-8">
            <h1 className="animate-pulse text-3xl text-main_2 font-semibold">Now Listening to:</h1>
            <div className="w-2/3"> 
            {randomSong && userInfo && (
                <SongContainer loggedInUserID={userId} userInfo={userInfo} songInfo={randomSong} />
            )}
            </div>
            <div>
                <button className="bg-main_1 px-4 py-2 rounded hover:bg-main_2 transition 250 ease-in-out text-white text-2xl" onClick={updateCurrentSong}>Next Song</button>
            </div>
        </div>
    )
}