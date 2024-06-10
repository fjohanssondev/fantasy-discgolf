import { db } from "~/lib/db"

export default async function Sidebar(){

  const competitions = await db.competition.findMany()

  return (
    <nav>
      <ul>
        {competitions.map(competition => (
          <li>{competition.name}</li>
        ))}
      </ul>
    </nav>
  )
}