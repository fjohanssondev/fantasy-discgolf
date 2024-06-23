'use client'

import { useState } from "react"
import { Player, Team } from "@prisma/client"
import { toast } from "sonner"

import SquadPicker from "./player_picker"
import TeamList from "./team_list"
import Submit from "../submit_button"
import { handleSubmitTeam } from "~/actions/actions"

interface TeamWithPlayers extends Team {
  players: Player[]
}

interface TeamManagementProps {
  team: TeamWithPlayers
  players: Player[]
}

export default function TeamManagement({ team, players }: TeamManagementProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>(team.players)
  const [selectedCaptain, setSelectedCaptain] = useState<Player | null>(null)
  const [selectedViceCaptain, setSelectedViceCaptain] = useState<Player | null>(null)
  const [budgetLeft, setBudgetLeft] = useState<number>(team.budget)

  const handleSubmitTeamWithId = handleSubmitTeam.bind(null, selectedPlayers, budgetLeft)

  const handleRemovePlayer = (players: Player[], player: Player) => {
    setBudgetLeft(() => budgetLeft + player.price)
    setSelectedPlayers(() => players.filter(p => p.id !== player.id))
  }

  const handleConfirmTeam = async () => {
    if (selectedPlayers.length !== 5){
      toast.error("You need to select 5 players")
      return
    }

    if (budgetLeft < 0){
      toast.error("You have exceeded your budget")
      return
    }

    await handleSubmitTeamWithId()
    toast.success("Team saved")
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1 flex-col mt-4">
        <span className="text-xl">Budget left: <span className={budgetLeft <= 0 ? "bg-red-500" : ""}>{budgetLeft}kr</span></span>
        <TeamList
          players={selectedPlayers}
          setSelectedPlayers={setSelectedPlayers}
          handleRemovePlayer={handleRemovePlayer}
        />
        <Submit onClick={() => handleConfirmTeam()} disabled={budgetLeft < 0}>Save</Submit>
      </div>
      <SquadPicker
        players={players}
        setSelectedPlayers={setSelectedPlayers}
        budgetLeft={budgetLeft}
        setBudgetLeft={setBudgetLeft}
      />
    </div>
  )
}