import { League, Team } from "@prisma/client"
import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "~/auth"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

interface LeagueWithTeams extends League {
  teams: Team[]
}

export default async function MyLeaguesTable({ leagues } : { leagues: LeagueWithTeams[] }) {
  const session = await auth()

  if (!session) {
    return redirect("/login")
  }

  return (
    <Table>
      <TableCaption>My Leagues</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>League name</TableHead>
          <TableHead>Current rank</TableHead>
          <TableHead className="text-right">Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leagues.map((league) => (
            <TableRow key={league.id}>
              <TableCell><Link className="hover:underline" href={`/league/${league.id}`}>{league.name}</Link></TableCell>
              <TableCell className="font-medium">{0}</TableCell>
              <TableCell className="text-right">{league.teams.find(team => team.userId === session?.user?.id)?.points}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}