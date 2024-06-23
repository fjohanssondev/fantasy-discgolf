'use client'

import { Player } from "@prisma/client";
import { Button } from "../ui/button";

interface TeamListProps {
  players: Player[];
  setSelectedPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  handleRemovePlayer: (players: Player[], player: Player) => void;
}

export default function TeamList({ players, handleRemovePlayer }: TeamListProps) {
  return (
    <div>
      <ul className="flex flex-col gap-4">
        {players.map((player) => (
          <li className="flex items-center justify-between" key={player.id}>
            <span>{player.name}</span>
            <Button onClick={() => handleRemovePlayer(players, player)}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}