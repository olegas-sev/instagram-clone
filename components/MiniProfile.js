import {signOut, useSession} from "next-auth/react"

function MiniProfile() {
    const {data: session} = useSession();
    console.log(session);
    return (
        <div className="flex items-center justify-between mt-14 ml-10">
            <img className="w-16 h-16 rounded-full border p-[2px]" src={session?.user?.image} alt={"Image of " + session?.user?.name} />
            <div className="flex-1 mx-4">
                <h2 className="font-bold">{session?.user?.username}</h2>
                <h3 className="text-sm text-gray-400">Welcome back!</h3>
            </div>
            <button onClick={signOut} className="font-semibold text-sm text-red-400">Sign out</button>
        </div>
    )
}

export default MiniProfile
