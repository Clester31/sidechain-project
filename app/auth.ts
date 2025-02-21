import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { Comment, Song, User } from "./types";
import { v4 as uuidv4 } from 'uuid';

export const signUpWithEmail = async (email: string, username: string, password: string) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        const storage = getStorage();

        const pfpImageRef = ref(storage, 'images/default/defaultpfp.png');
        const pfpImageUrl = await getDownloadURL(pfpImageRef);

        const bannerImageRef = ref(storage, 'images/default/default_banner.png');
        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        await setDoc(doc(db, "users", user.uid), {
            userId: user.uid,
            username,
            email,
            profilePic: pfpImageUrl,
            bannerPic: bannerImageUrl,
            bio: '',
            followers: [],
            following: [],
            songs: [],
            createdAt: new Date().toISOString(),
            likedSongs: [],
            reposts: [],
            comments: [],
            credits: 0
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const logInWithEmail = async (email: string, password: string) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        return userCredentials.user;
    } catch (error) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const logOut = async () => {
    try {
        await auth.signOut();
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }

    }
}

export const fetchUserInfo = async (uid: string): Promise<User | null> => {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        const data = userDoc.data();
        if (data) {
            return data as User;
        }
        return null;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

// profile settings customization (username, profile picture, banner picture, bio)

export const updateUsername = async (uid: string, newUsername: string) => {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        const data = userDoc.data();
        if (data) {
            await setDoc(doc(db, "users", uid), {
                ...data,
                username: newUsername
            });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }

    }
}

export const updateProfilePicture = async (uid: string, newProfilePicture: File | null) => {
    try {
        if (newProfilePicture) {
            console.log('test')
            const storage = getStorage();
            const imageRef = ref(storage, `images/profile_pictures/${uid}/${uid}-${uuidv4()}`);
            await uploadBytes(imageRef, newProfilePicture);
            const imageUrl = await getDownloadURL(imageRef);

            const userDoc = await getDoc(doc(db, "users", uid));
            const data = userDoc.data();
            if (data) {
                await setDoc(doc(db, "users", uid), {
                    ...data,
                    profilePic: imageUrl
                });
            }
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const updateProfileBanner = async (uid: string, newProfileBanner: File | null) => {
    try {
        if (newProfileBanner) {
            const storage = getStorage();
            const imageRef = ref(storage, `images/banners/${uid}/${uid}-${uuidv4()}`);
            await uploadBytes(imageRef, newProfileBanner);
            const imageUrl = await getDownloadURL(imageRef);

            const userDoc = await getDoc(doc(db, "users", uid));
            const data = userDoc.data();
            if (data) {
                await setDoc(doc(db, "users", uid), {
                    ...data,
                    bannerPic: imageUrl
                });
            }
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

// song uploading

export const uploadSong = async (userId: string, userInfo: User | null, songTitle: string, songDesc: string, songTags: string, songCover: File | null, audioFile: File | null) => {
    try {
        if (songCover && audioFile && userInfo) {
            const storage = getStorage();

            const songCoverRef = ref(storage, `songCovers/${userId}/${songTitle}-${uuidv4()}`);
            await uploadBytes(songCoverRef, songCover);
            const songCoverUrl = await getDownloadURL(songCoverRef);

            const audioFileRef = ref(storage, `songs/${userId}/${songTitle}-${uuidv4()}`);
            await uploadBytes(audioFileRef, audioFile);
            const audioFileUrl = await getDownloadURL(audioFileRef);

            const tagsArray = songTags.split(',').map(tag => tag.trim());

            const newSong: Song = {
                songId: uuidv4(),
                userId,
                title: songTitle,
                description: songDesc,
                tags: tagsArray,
                artist: userInfo.username,
                songUrl: audioFileUrl,
                coverArt: songCoverUrl,
                usersLiked: [],
                usersReposted: [],
                comments: [],
                uploadedAt: new Date().toISOString(),
            };

            const userDoc = await getDoc(doc(db, "users", userId));
            const userData = userDoc.data();
            if (userData) {
                const updatedSongs = [...userData.songs, newSong.songId];
                await setDoc(doc(db, "users", userId), {
                    ...userData,
                    songs: updatedSongs
                });
            }

            await setDoc(doc(db, "songs", newSong.songId), newSong);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const fetchSong = async (songId: string) => {
    try {
        const songDoc = await getDoc(doc(db, "songs", songId));
        return songDoc.data() as Song
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
        
    }
}

export const fetchSongs = async (songIds: string[]) => {
    try {
        console.log(songIds)
        const songs: Song[] = [];
        if (Array.isArray(songIds)) {
            for (const songId of songIds) {
                const songDoc = await getDoc(doc(db, "songs", songId));
                const songData = songDoc.data();
                if (songData) {
                    songs.push(songData as Song);
                }
            }
        }
        return songs;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
        
    }
}

// fetches and returns a random song from the database
export const fetchRandomSong = async () => {
    try {
        const songsCollection = collection(db, "songs");
        const songSnapshot = await getDocs(songsCollection);
        const randomIndex = Math.floor(Math.random() * songSnapshot.docs.length);
        const randomSongDoc = songSnapshot.docs[randomIndex];
        return randomSongDoc.data() as Song;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
        
    }
}

// liking and reposting songs

export const likeSong = (userId: string, songInfo: Song) => {
    try {
        const userDoc = doc(db, "users", userId);
        const songDoc = doc(db, "songs", songInfo.songId);

        // update the users liked songs
        
        // if the user has already liked the song, we will remove it from the users like list and remove the user from the songs usersLiked list
        if (songInfo.usersLiked.find(user => user === userId)) {
            setDoc(userDoc, {
                likedSongs: songInfo.usersLiked.filter(song => song !== songInfo.songId)
            }, { merge: true });

            setDoc(songDoc, {
                usersLiked: songInfo.usersLiked.filter(user => user !== userId)
            }, { merge: true });
        } else {
            // if the user has not liked the song, we will add it to the users liked list and add the user to the songs usersLiked list
            setDoc(userDoc, {
                likedSongs: [...songInfo.usersLiked,  songInfo.songId ]
            }, { merge: true });

            setDoc(songDoc, {
                usersLiked: [...songInfo.usersLiked,  userId ]  
            }, { merge: true });
        }
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
        
    }
}

export const repostSong = (userId: string, songInfo: Song) => {
    try {
        const userDoc = doc(db, "users", userId);
        const songDoc = doc(db, "songs", songInfo.songId);

        if (songInfo.usersReposted.find(user => user === userId)) {
            setDoc(userDoc, {
                repostedSongs: songInfo.usersReposted.filter(song => song !== songInfo.songId)
            }, { merge: true });

            setDoc(songDoc, {
                usersReposted: songInfo.usersReposted.filter(user => user !== userId)
            }, { merge: true });
        } else {
            setDoc(userDoc, {
                repostedSongs: [...songInfo.usersReposted,  songInfo.songId ]
            }, { merge: true });

            setDoc(songDoc, {
                usersReposted: [...songInfo.usersReposted,  userId ]
            }, { merge: true });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
    }
}

export const addComment = async (userId: string, songInfo: Song, comment: Comment) => {
    try {
        const userDoc = doc(db, "users", userId);
        const songDoc = doc(db, "songs", songInfo.songId);

        // fetch userInfo from userId
        const userInfo: User | null = await fetchUserInfo(userId);

        setDoc(songDoc, {
            comments: [...songInfo.comments, comment]
        }, { merge: true });
        if (userInfo) {
            setDoc(userDoc, {
                comments: [...userInfo.comments, comment]
            }, { merge: true });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw error.message;
        } else {
            throw String(error);
        }
        
    }
}