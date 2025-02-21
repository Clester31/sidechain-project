// user
export type User = {
    userId: string;
    username: string;
    email: string;
    profilePic: string;
    bannerPic: string;
    bio: string;
    followers: User[];
    following: User[];
    songs: string[];
    createdAt: string;
    likedSongs: string[];
    repostedSongs: string[];
    comments: Comment[];
    credits: number;
}

// song
export type Song = {
    songId: string;
    userId: string;
    title: string;
    description: string;
    tags: string[];
    artist: string;
    songUrl: string;
    coverArt: string;
    usersLiked: string[];
    usersReposted: string[];
    comments: Comment[];
    uploadedAt: string;
}

// comment
export type Comment = {
    commentId: string;
    userId: string;
    username: string | null;
    profilePic: string | null;
    songId: string;
    content: string;
    replies: Comment[];
    likes: User[];
    createdAt: string;
}