import { getTeamById } from "~/lib/utils"

export default async function UserTeamIdPage({ params }: { params: { id: string } }) {
  const team = await getTeamById(params.id)

  return (
    <section>
      <h1 className="text-2xl font-medium">{team?.name} - Owned by {team?.user.name}</h1>
      <ul>
        {team?.players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </section>
  )
}