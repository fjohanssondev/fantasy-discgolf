import Link from "next/link"
import { db } from "~/lib/db"

export default async function Sidebar(){

  const competitions = await db.competition.findMany()

  return (
    <nav>
      <span className="text-xs font-medium">Events</span>
      <ul>
        {competitions.map(({ name, id, eventId }) => (
          <li key={id}>
            <Link className="text-sm" href={`/event/${eventId}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}