import { Player, UserTeam } from "@prisma/client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

interface Leaderboard {
  leaderboard: UserTeam[]
}

export default function Leaderboard({ leaderboard }: Leaderboard){
  return (
    <Table>
      <TableCaption>Leaderboard</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Placering</TableHead>
          <TableHead>Namn</TableHead>
          <TableHead className="text-right">Poäng</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboard.map((player, idx) => (
          <TableRow key={player.id}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>{player.name}</TableCell>
            <TableCell className="text-right">{player.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}