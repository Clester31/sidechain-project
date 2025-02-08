/* eslint-disable @next/next/no-img-element */
import { addComment, likeSong, repostSong } from "@/app/auth";
import { Song, User } from "@/app/types";
import { useEffect, useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
import { v4 as uuidv4 } from 'uuid';
import 'react-h5-audio-player/lib/styles.css';

export default function SongContainer({ loggedInUserID, userInfo, songInfo }:
    {
        loggedInUserID: string;
        userInfo: User;
        songInfo: Song;
    }
) {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isReposted, setIsReposted] = useState<boolean>(false);
    const [commentContent, setCommentContent] = useState<string>('');

    useEffect(() => {
        console.log(songInfo);
        const fetchLikesAndReposts = () => {
            //console.log(songInfo.usersLiked[0], loggedInUserID);
            if (songInfo.usersLiked.includes(loggedInUserID)) {
                setIsLiked(true);
            }
            if (songInfo.usersReposted.includes(loggedInUserID)) {
                setIsReposted(true);
            }
        }
        fetchLikesAndReposts();
    }, [loggedInUserID, songInfo.usersLiked, songInfo.usersReposted, songInfo])


    const likeUserSong = () => {
        setIsLiked(!isLiked);
        likeSong(loggedInUserID, songInfo);
    }

    const repostUserSong = () => {
        setIsReposted(!isReposted);
        repostSong(loggedInUserID, songInfo);
    }

    const addCommentToSong = () => {
        const newComment = {
            commentId: uuidv4(),
            userId: loggedInUserID,
            username: userInfo.username,
            profilePic: userInfo.profilePic,
            songId: songInfo.songId,
            content: commentContent,
            replies: [],
            likes: [],
            createdAt: new Date().toISOString()
        }
        addComment(loggedInUserID, songInfo, newComment);
    }

    return (
        <div className="flex flex-col w-full">
            <div className="m-auto flex flex-row p-4 bg-gray-100 rounded gap-4 w-full">
                <div>
                    <img src={songInfo.coverArt} className="w-36 h-36" alt="song cover" />
                </div>
                <div className="flex flex-col gap-4 w-4/6">
                    <div>
                        <h1 className="text-2xl font-semibold hover:text-main_2 transition 250 ease-in-out cursor-pointer">{songInfo.title}</h1>
                        <h2 className="text-lg">{songInfo.artist}</h2>
                    </div>
                    <div className="w-full">
                        <AudioPlayer
                            src={songInfo.songUrl}
                            showSkipControls={false}
                            showJumpControls={false}
                            showDownloadProgress={false}
                            layout="horizontal"
                            customAdditionalControls={[]}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-12 items-center m-auto justify-center">
                    <div className="flex flex-col gap-2 items-center">
                        <button onClick={likeUserSong} disabled={loggedInUserID === songInfo.userId || loggedInUserID === 'no_id'}>
                            <i className={`fa-solid fa-heart text-4xl hover:text-main_2 transition 250-ease-in-out cursor-pointer ${isLiked ? 'text-main_1' : 'text-black'}`}></i>
                        </button>
                        <h1 className="text-gray-500 text-2xl">{songInfo.usersLiked.length}</h1>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <button onClick={repostUserSong} disabled={loggedInUserID === songInfo.userId || loggedInUserID === 'no_id'}>
                            <i className={`fa-solid fa-retweet text-4xl hover:text-main_2 transition 250-ease-in-out cursor-pointer ${isReposted ? 'text-main_1' : 'text-black'}`}></i>
                        </button>
                        <h1 className="text-gray-500 text-2xl">{songInfo.usersReposted.length}</h1>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200 p-4">
                <h1 className="text-xl font-semibold">Comments</h1>
                <div className="flex flex-col gap-4 w-full">
                    {
                        songInfo.comments.map(comment => {
                            return (
                                <div key={comment.commentId} className="flex flex-row gap-4 p-4 bg-gray-100 rounded">
                                    <div>
                                        <img src={comment.profilePic ?? '/default-profile-pic.png'} className="w-16 h-16 rounded-full" alt="profile picture" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-lg font-semibold">{comment.username}</h1>
                                        <p className="text-lg">{comment.content}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="flex flex-row items-center gap-4">
                        <input onChange={(e) => setCommentContent(e.target.value)} type="text" placeholder="Add a comment" className="w-full text-lg p-2 rounded" />    
                        <button onClick={addCommentToSong} className="rounded-full bg-main_1 w-8 h-8 text-white">+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}