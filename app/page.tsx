import Leaderboard from "~/components/leaderboard";
import { SignIn } from "~/components/signin";
import { db } from "~/lib/db";

export interface Player {
  name: string
  points: number
}

export default async function Home() {

  const users = await db.user.findMany({
    include: {
      userTeam: true
    }
  })

  const leaderboard = users.map(player => {
    return {
      name: player.name,
      points: player.userTeam.reduce((acc, curr) => acc + curr.points, 0)
    }
  }).sort((a, b) => b.points - a.points)

  return (
    <main className="mx-auto max-w-screen-lg">
     <Leaderboard leaderboard={leaderboard} />
     <SignIn />
    </main>
  );
}
