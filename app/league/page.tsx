import { db } from "~/lib/db";
import { auth } from "~/auth";
import CreateOrJoinLeague from "~/components/create_or_join_league";
import MyLeaguesTable from "./my_leagues_table";
import { redirect } from "next/navigation";

export default async function Leagues() {
  const session = await auth()

  const my_team = await db.team.findFirst({
    where: {
      userId: session?.user?.id
    }
  })

  if (!my_team) {
    redirect("/team/create")
  }

  const my_leagues = await db.league.findMany({
    where: {
      teams: {
        some: {
          userId: session?.user?.id
        }
      }
    },
    include: {
      teams: {
        include: {
          players: true
        }
      }
    }
  })

  return (
    <section>
      <h1 className="text-2xl font-medium mb-4">My Leagues - {my_team?.name}</h1>
      <section className="flex justify-center"><CreateOrJoinLeague /></section>
      <MyLeaguesTable leagues={my_leagues} />
    </section>
  );
}