'use client'

import { useState } from "react"
import PlayerSelection from "./player_selection"
import PlayerCard from "./player_card"
import { Player } from "~/types/types"
import { Button } from "~/components/ui/button"

export interface TeamManagementProps {
  players: Player[]
}

export default function TeamManagement({ players }: TeamManagementProps){

  const [team, setTeam] = useState([])

  return (
    <div>
      <PlayerSelection team={team} setTeam={setTeam} players={players} />
      <div className="mt-8">
        <h2 className="text-sm font-medium mb-2">Ditt lag</h2>
        <div className="space-y-2">
          {team.length > 0 ? team.map(player => <PlayerCard setTeam={setTeam} player={player} />) : (
            <span>Du har inte valt någon spelare ännu</span>
          )}
        </div>
      </div>
      <div className="flex mt-4">
        <Button className="ml-auto">Spara</Button>
      </div>
    </div>
  )
}