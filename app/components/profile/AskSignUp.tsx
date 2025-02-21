import { useRouter } from "next/navigation"

export default function AskSignUp() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center p-8 gap-4 bg-gray-100 text-2xl rounded">
            <h1>Sign up or log in to access this feature</h1>
            <div className="flex gap-4">
                <button className='px-4 py-2 bg-main_1 hover:bg-main_2 transition 250 ease-in-out text-white w-32 text-xl' onClick={() => router.push('/signup')}>Sign Up</button>
                <button className='px-4 py-2 bg-main_1 hover:bg-main_2 transition 250 ease-in-out text-white w-32 text-xl' onClick={() => router.push('/login')}>Log In</button>
            </div>

        </div>
    )
}