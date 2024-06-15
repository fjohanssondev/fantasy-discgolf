import Leaderboard from "~/components/leaderboard";
import { db } from "~/lib/db";
import { constructLeaderboard } from "~/lib/utils";

export interface Player {
  name: string
  points: number
}

export default async function Home() {

  const users = await db.user.findMany({
    include: {
      userTeam: {
        include: {
          captain: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  const leaderboard = constructLeaderboard(users)

  console.log(leaderboard[1])

  return (
    <section>
     <Leaderboard leaderboard={leaderboard} />
    </section>
  );
}
