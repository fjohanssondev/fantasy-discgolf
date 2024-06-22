import { getTeamById } from "~/lib/utils"

export default async function MyTeam({ params }: { params: { id: string } }) {
  const team = await getTeamById(params.id)

  return (
    <h1>My team - {team?.name}</h1>
  )
}