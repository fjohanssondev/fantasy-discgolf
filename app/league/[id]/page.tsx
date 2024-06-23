import { db } from "~/lib/db";
import ShareLeagueCode from "~/components/share_league_code";
import Leaderboard from "~/components/leaderboard";
import { notFound } from "next/navigation";
import { auth } from "~/auth";

export default async function League({ params }: { params: { id: string } }) {

  const session = await auth()

  const league = await db.league.findFirst({
    where: {
      id: params.id
    },
    include: {
      teams: {
        include: {
          user: true
        }
      }
    }
  })

  if (!league) {
    return notFound()
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{league.name}&apos;s League</h1>
        {league.creatorId === session?.user?.id && <ShareLeagueCode code={league.code} />}
      </div>
      <div className="mt-12">
        <Leaderboard leaderboard={league.teams} />
      </div>
    </section>
  )
}