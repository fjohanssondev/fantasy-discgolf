import { db } from "~/lib/db"
import { Badge } from "~/components/ui/badge"
import Deadline from "./deadline"
import TeamManagement from "./team_management"

async function getPlayers(eventId: string){
  try {
    const res = await fetch(`https://web-scraping-api-nnrj.onrender.com/api/event/${eventId}`, { cache: 'force-cache' })

    if (!res.ok){
      throw new Error('Failed to fetch data')
    }

    return res.json()
  } catch (e){
    console.error(e)
  }
}

export default async function Competition({ params }: { params: { id: string } }){

  const competition = await db.competition.findFirst({
    where: {
      eventId: Number(params.id)
    },
    include: {
      userTeam: true
    }
  })

  const players = await getPlayers(params.id)

  return (
    <section>
    <Badge variant="open">Öppen</Badge>
    <h1 className="text-3xl font-medium my-4">{competition?.name}</h1>
    <Deadline date={competition?.deadline} />
    <div className="mt-8">
      <TeamManagement players={players} />
    </div>
    </section>
  )
}