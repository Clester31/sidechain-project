import { logOut } from "@/app/auth";
import { useRouter } from "next/navigation";

export default function NavbarUserSettings() {
    const router = useRouter();

    return (
        <div className="absolute top-16 right-0 flex flex-col gap-4 p-4 bg-gray-100 rounded font-semibold z-10">
            <h1 className="cursor-pointer" onClick={() => router.push('/settings')}>User Settings</h1>
            <h1 className="text-red-500 cursor-pointer" onClick={() => logOut()}>Log Out</h1>
        </div>
    )
}