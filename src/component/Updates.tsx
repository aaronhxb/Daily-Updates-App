import { api } from "~/trpc/react";
import { Update } from "./Update";
import { useState } from "react";
import { object } from "zod/v4";


export function Updates({
  userId,
  onLogout,
}: {
  userId: string;
  onLogout: () => void;
}) {
  
  const [showAnalytics, setShowAnalytics] = useState(false)

  const { data: updates, isLoading, isError } = api.update.getAll.useQuery(
    { userId }, { enabled: !!userId });

  if (!userId) return<div>Loading...</div>;
  if (isLoading) return <div>Loading updates...</div>;
  if (isError) return <div>Error...</div>;
  if (!updates)  return <div>No data</div>;
  
  //analytics part
  const totalUpdates = updates.length
  const updateByDay = updates.reduce<Record<string, number>>((acc, update)=>{
    const day = new Date(update.createdAt).toLocaleDateString();
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});
  const words = updates.flatMap(u=>u.text.split(/\W+/)
  .filter(word => word !== '').map(word=>word.toLowerCase())
  );
  const counts = words.reduce<Record<string, number>>((acc, word) => {
    acc[word] = (acc[word]|| 0) + 1;
    return acc;
  }, {});
  const sortedWords = Object.entries(counts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0,5)
  

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-gray-800">
         Welcome, <span className="text-blue-600">{userId}</span>! 
        </h1>
        <button onClick={onLogout}
          className="bg-red-400 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
        >Logout
        </button>
      </header>


      {/*analytics card, hidden in default*/}
      { showAnalytics && (
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Analytics</h2>
          <p className="font-medium text-gray-800">Total updates: {totalUpdates}</p>

          <div className="mt-4">
            <h3 className="font-medium text-gray-800">Updates per day</h3>
            <ul className="mt-2">
              {Object.entries(updateByDay).map(([day,count])=>(
                <li key={day}>{day}: {count}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-gray-800">Top Words</h3>
            <ul className="mt-2">
              {sortedWords.map(([word, count]) => (
                <li key={word}>
                  {word}: {count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
          Your Daily Updates</h2>
          {/*toggle analytics*/}
          <button className="text-sm text-orange-600 hover: underline"
          onClick={()=>setShowAnalytics(!showAnalytics)}
          >
            {showAnalytics ? "Hide Analytics" : "Show Analytics" }
          </button>
        </div>
        
        <ul className="space-y-4">
          {updates.length ? (
          updates.map((update) => (
            <li
              key={update.id}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <Update update={update} />
            </li>
          ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Update your first text</div>
          )}
        </ul>
      </section>
    </div>
  );
}
