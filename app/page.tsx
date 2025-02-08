export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <h1 className="text-6xl font-semibold bg-gradient-to-r from-main_1 to-main_2 bg-clip-text text-transparent pb-8">Welcome to Sidechain</h1>
      <div className="text-center flex flex-col gap-4 items-center bg-gray-100 w-screen py-8">
        <p className="flex text-lg w-3/5 m-auto">Sidechain is all about providing and recieving feedback on your or others music from likeminded producers. Get started today!</p>
        <div className="flex gap-4">
          <button className='px-4 py-2 bg-main_1 hover:bg-main_2 transition 250 ease-in-out text-white w-32'>Sign Up</button>
          <button className='px-4 py-2 bg-main_1 hover:bg-main_2 transition 250 ease-in-out text-white w-32'>Log In</button>
        </div>
      </div>
      <div>
        <h1>How it works</h1>
        <p>Sidechain will give one one song at a time to listen to. User&apos;s are encouraged to leave a comment and repost or like the song as well. Once you have listened to one song, you can continue to listen to other songs for as much as you&apos;d like</p>
        <p>You can upload your own music for other&apos;s to listen to and give feedback on as well. Use comments as a way to interact with other&apos;s who take interest in your music</p>
      </div>
    </div>
  )
}