import { useState } from "react"

const ALLOWED_USER_ID = "fakeuser"

export function SignIn({ onSignIn }: { onSignIn: () => void }) {
    const [ user, setUser ] = useState("")
    const [ error, setError ] = useState("")

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        const name = user.trim().toLowerCase();
        if(name !== ALLOWED_USER_ID)  {
            setError("User is not exist");
            return;
        }
        localStorage.setItem("userId", user);
        console.log("username is ", user);
        setError("");
        onSignIn();
    }

    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl mb-6 font-bold">Daily Update</h1>
            <form onSubmit={handleSignIn} className="flex flex-col gap-3 w-72">
                <input
                className="border rounded px-3 py-2"
                value={user}
                onChange={e => setUser(e.target.value)}
                placeholder="Enter your name"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded"
                >
                Sign In
                </button>
      </form>
    </div>
    )
}