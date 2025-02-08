/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { User } from "../types";
import { fetchUserInfo, uploadSong } from "../auth";
import { useRouter } from "next/navigation";

export default function Upload() {
    const { user } = useAuth();
    const router = useRouter();

    const [userId, setUserId] = useState<string>("no_id");
    const [userInfo, setUserInfo] = useState<User | null>(null);

    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [songCover, setSongCover] = useState<File | null>(null);
    const [songCoverDisplay, setSongCoverDisplay] = useState<string>("");

    const [songTitle, setSongTitle] = useState<string>("");
    const [songDesc, setSongDesc] = useState<string>("");
    const [songTags, setSongTags] = useState<string>("");

    useEffect(() => {
        if (user) {
            setUserId(user.uid);
            fetchUserInfo(Array.isArray(userId) ? userId[0] : userId).then(
                (fetchedUserInfo) => {
                    if (fetchedUserInfo) {
                        setUserInfo(fetchedUserInfo);
                    }
                }
            );
        }
    }, [user, userId]);

    const uploadNewSong = () => {
        uploadSong(
            userId,
            userInfo,
            songTitle,
            songDesc,
            songTags,
            songCover,
            audioFile
        );
        router.push(`/profile/${userId}`);
    };

    return (
        <div className="w-full mt-16 flex flex-col items-center justify-center gap-16 p-8">
            <h1 className="text-2xl font-semibold">Upload</h1>
            <div className="flex flex-row w-full">
                <div className="w-96 h-96 text-black border-2 border-dashed border-gray-400 flex items-center justify-center w-1/2 m-auto">
                    {!songCoverDisplay ? (
                        <label className="w-full h-full flex items-center justify-center cursor-pointer">
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setSongCover(file);
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setSongCoverDisplay(reader.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            Upload Cover Image
                        </label>
                    ) : (
                        <div>
                            <div
                                className="m-1 absolute p-2 bg-red-500 w-8 h-8 text-center flex items-center justify-center rounded-full text-white font-bold cursor-pointer"
                                onClick={() => {
                                    setSongCover(null);
                                    setSongCoverDisplay("");
                                }}
                            >
                                X
                            </div>
                            <img
                                src={songCoverDisplay}
                                alt="song cover"
                                className="w-96 h-96"
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-4 justify-center items-center w-1/2 text-center">
                    <div className="flex flex-col gap-2 w-full items-center">
                        Song Title*
                        <label htmlFor="song-title"></label>
                        <input
                            type="text"
                            name="song-title"
                            className="px-4 py-2 rounded border-gray-300 border-2 w-1/2"
                            onChange={(e) => setSongTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full items-center">
                        Song Description
                        <label htmlFor="song-desc"></label>
                        <input
                            type="text"
                            name="song-desc"
                            className="px-4 py-2 rounded border-gray-300 border-2 w-1/2"
                            onChange={(e) => setSongDesc(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full items-center">
                        Genre Tags (comma separated)
                        <label htmlFor="song-genre"></label>
                        <input
                            type="text"
                            name="song-genre"
                            className="px-4 py-2 rounded border-gray-300 border-2 w-1/2"
                            onChange={(e) => setSongTags(e.target.value)}
                        />
                    </div>
                    <h1>Song File*</h1>
                    <div className="bg-gray-100 px-4 py-8 rounded w-1/2">
                        <label className="bg-main_1 px-4 py-2 text-white cursor-pointer w-32 hover:bg-main_2 transition 250 ease-in-out">
                            <input
                                type="file"
                                className="hidden"
                                accept="audio/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setAudioFile(file);
                                    }
                                }}
                            />
                            Upload Audio File
                        </label>
                        {audioFile && <span className="ml-4">{audioFile.name}</span>}
                    </div>
                    <button
                        disabled={!audioFile || songTitle.length < 1}
                        className="bg-main_1 text-white px-4 py-2 rounded hover:bg-main_2 transition 250 ease-in-out w-1/2 mt-2 disabled:bg-teal-500/25"
                        onClick={uploadNewSong}
                    >
                        Upload Song!
                    </button>
                </div>
            </div>
        </div>
    );
}