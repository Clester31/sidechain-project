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
    reposts: string[];
    comments: Comment[];
}

// song
export type Song = {
    songId: string;
    title: string;
    description: string;
    tags: string[];
    artist: string;
    songUrl: string;
    coverArt: string;
    usersLiked: User[];
    usersReposted: User[];
    comments: Comment[];
    uploadedAt: string;
}

// comment
export type Comment = {
    commentId: string;
    userId: string;
    songId: string;
    content: string;
    replies: Comment[];
    likes: User[];
    createdAt: string;
}