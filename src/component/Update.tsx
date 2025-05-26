export function Update(  {update}: any  ) {
    const { id, text } = update

    return (
        <div className="space-y-1">
            <p className="text-gray-800">{text}</p>
            <div className="text-xs mt-2 text-gray-500">
                {new Date(update.createdAt).toLocaleString()}
            </div>
        </div>
    )
}