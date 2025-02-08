/* eslint-disable @next/next/no-img-element */
export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-semibold bg-gradient-to-r from-main_1 to-main_2 bg-clip-text text-transparent pb-8">Welcome to Sidechain</h1>
      <div className="text-center flex flex-col gap-4 items-center bg-gray-100 w-screen py-8">
        <p className="flex text-2xl w-3/5 m-auto">Sidechain is all about providing and recieving feedback on your or others music from likeminded producers. Get started today!</p>
        <div className="flex gap-4">
          <button className='px-4 py-2 bg-main_1 hover:bg-main_2 transition 250 ease-in-out text-white w-32 text-xl'>Sign Up</button>
          <button className='px-4 py-2 bg-main_1 hover:bg-main_2 transition 250 ease-in-out text-white w-32 text-xl'>Log In</button>
        </div>
      </div>
      <div className="text-center flex flex-col gap-4 justify-center items-center bg-w-screen py-8">
        <h1 className="font-semibold text-2xl">How it works</h1>
        <div className="flex flex-row gap-4 items-center justify-around m-auto bg-gradient-to-r from-main_1 to-white p-4 rounded-lg">
          <p className="w-2/5 text-xl p-4 bg-white/50 rounded">Sidechain will give one one song at a time to listen to. User&apos;s are encouraged to leave a comment and repost or like the song as well. Once you have listened to one song, you can continue to listen to other songs for as much as you&apos;d like</p>
          <div className="flex w-3/5 items-center justify-center m-auto ">
            <img src="/listen-scrn.png" alt='image' className="w-2/3 border-main_1 border-2 rounded-xl" />
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center justify-around m-auto bg-gradient-to-l from-main_2 to-white p-4 rounded-lg">
          <div className="flex w-3/5 items-center justify-center m-auto ">
            <img src="/upload-scrn.png" alt='image' className="w-2/3 border-main_1 border-2 rounded-xl" />
          </div>
          <p className="w-2/5 text-xl p-4 bg-white/50 rounded">You can upload your own music for other&apos;s to listen to and give feedback on as well. Use comments as a way to interact with other&apos;s who take interest in your music</p>
        </div>
        <div className="flex flex-row gap-4 items-center justify-around m-auto bg-gradient-to-l from-white to-gray-400 p-4 rounded-lg">
          <p className="w-2/5 text-xl p-4 bg-white/50 rounded">Customize your own profile to fit the style you desire! Other users can see your posted songs as well as songs that you have liked or reposted</p>
          <div className="flex w-3/5 items-center justify-center m-auto ">
            <img src="/profile-scrn.png" alt='image' className="w-2/3 border-main_1 border-2 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}