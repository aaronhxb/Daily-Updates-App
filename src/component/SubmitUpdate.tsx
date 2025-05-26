import { useState } from "react"
import { api } from "~/trpc/react";


export function SubmitUpdate({userId}:{userId:string}) {

    const [ text, setText ] = useState("")
    const trpc = api.useContext();

    const createUpdate = api.update.create.useMutation({
        onSettled: async() => {
            setText("")
            await trpc.update.getAll.invalidate( {userId} )
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createUpdate.mutate({ userId, text: text.trim() })
    };

    return (
        <form onSubmit={handleSubmit}
        className ="max-w-lg mx-auto mt-6 flex flex-col gap-3">
            <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What did you do today?"
                className="border rounded p-2 min-h-[100px] resize-none"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white font-medium rounded px-5 py-2.5"
            >
                Submit
            </button>
        </form>
    )
}