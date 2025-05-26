import { api } from "~/trpc/server";
import { DashBoard } from "../component/DashBoard";




export default async function Home() {
  //const hello = await api.update.getAll();

  //void api.post.getLatest.prefetch();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <DashBoard />
    </main>
  );
}
