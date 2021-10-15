import { LoginIcon } from "@heroicons/react/outline"
import { getProviders, signIn as signIntoProvider } from "next-auth/react"
import Header from "../../components/Header"

// Browser...
function signIn({ providers }) {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
                <img className="w-80" src="https://links.papareact.com/ocw" alt="Instagram logo" />
                <p className="font-xs italic text-gray-600">
                    This is <u>not a real instagram</u>, it was build for educational purposes only.<br/><p>You can visit the real instagram <a className="underline text-blue-400" href="https://instagram.com" target="_blank">here</a></p>
                </p>
                <div className="mt-40">
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button
                                className="flex flex-row-reverse items-center p-3 bg-blue-500 rounded-lg text-white shadow-lg hover:scale-105 hover:shadow-xl transform transition-all ease-out"
                                onClick={() => signIntoProvider(
                                    provider.id, 
                                    { 
                                        callbackUrl: '/'
                                    }
                                    )
                                }
                            >
                                <LoginIcon className="h-5 ml-2" />
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

// Server side rendering
export async function getServerSideProps() {
    const providers = await getProviders()
    return {
        props: {
            providers,
        },
    }
}

export default signIn
