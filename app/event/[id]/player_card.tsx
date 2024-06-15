import { X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Player } from "~/types/types";

export interface PlayerCardProps {
  player: Player
  setTeam: any
}

export default function PlayerCard({ player, setTeam }: PlayerCardProps){
  return (
    <div className="flex items-center bg-white px-4 py-2 rounded">
      <span className="text-sm font-medium">{player.name}</span>
      <div className="ml-auto">
        <Button onClick={() => setTeam((prev: Player[]) => prev.filter(p => p.pdga_number !== player.pdga_number))} title="Ta bort spelare från laget" variant="ghost">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}