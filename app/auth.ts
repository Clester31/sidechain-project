import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Song, User } from "./types";
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
            comments: []
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
            const storage = getStorage();
            const imageRef = ref(storage, `images/profile_pictures/${uid}-${uuidv4()}`);
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

            await setDoc(doc(db, "songs", newSong.songId), newSong);

            const userDoc = await getDoc(doc(db, "users", userId));
            const userData = userDoc.data();
            if (userData) {
                const updatedSongs = [...userData.songs, newSong.songId];
                await setDoc(doc(db, "users", userId), {
                    ...userData,
                    songs: updatedSongs
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