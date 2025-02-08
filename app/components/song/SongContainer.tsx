/* eslint-disable @next/next/no-img-element */
import { Song } from "@/app/types";

export default function SongContainer({ songInfo }:
    {
        songInfo: Song;
    }
) {
    return (
        <div className="m-auto flex flex-row p-4 bg-gray-100 rounded gap-4">
            <div>
                <img src={songInfo.coverArt} className="w-36 h-36" alt="song cover" />
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-2xl font-semibold hover:bg-main_1">{songInfo.title}</h1>
                    <h2 className="text-lg">{songInfo.artist}</h2>
                </div>
                <div>
                    <audio controls src={songInfo.songUrl} className="w-full"></audio>
                </div>
            </div>
        </div>
    )
}