import { Team, User } from "@prisma/client"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

interface TeamWithUser extends Team {
  user: User
}

interface Leaderboard {
  leaderboard: TeamWithUser[]
}

export default function Leaderboard({ leaderboard }: Leaderboard){
  return (
    <Table>
      <TableCaption>Leaderboard</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Ranking</TableHead>
          <TableHead>Team name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead className="text-right">Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboard.map((team, idx) => (
          <TableRow key={team.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{team.name}</TableCell>
            <TableCell><Link className="hover:underline" href={`/user/${team.user.id}`}>{team.user.name}</Link></TableCell>
            <TableCell className="text-right">{team.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}