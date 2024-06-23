import { redirect } from "next/navigation"
import { getPlayers, getTeamById } from "~/lib/utils"
import TeamManagement from "~/components/team_management"
import { auth } from "~/auth"

export default async function MyTeam({ params }: { params: { id: string } }) {
  const session = await auth()
  const team = await getTeamById(params.id)
  const players = await getPlayers()

  if (!team) {
    return redirect("/team/create")
  }

  if (team.userId !== session?.user?.id) {
    return redirect(`/user/team/${team.id}`)
  }

  return (
    <section>
    <h1 className="text-2xl font-medium">My team - {team?.name}</h1>
    <TeamManagement team={team} players={players} />
    </section>
  )
}