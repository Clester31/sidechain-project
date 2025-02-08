export default function ProfileNav({ setNavMode }: {
    setNavMode: (mode: string) => void;
}) {
    return (
        <div className="bg-main_2 text-white h-8 w-2/3 flex m-auto">
            <div className="grid grid-cols-4">
                <button className="hover:bg-main_1 w-32 transition 250 ease-in-out" onClick={() => setNavMode('songs')}>Songs</button>
                <button className="hover:bg-main_1 w-32 transition 250 ease-in-out" onClick={() => setNavMode('likes')}>Likes</button>
                <button className="hover:bg-main_1 w-32 transition 250 ease-in-out" onClick={() => setNavMode('reposts')}>Reposts</button>
            </div>
        </div>
    )
}