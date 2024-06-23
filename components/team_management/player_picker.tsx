"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Player } from "@prisma/client"

interface PlayerPickerProps {
  players: Player[]
  setSelectedPlayers: React.Dispatch<React.SetStateAction<Player[]>>
  budgetLeft: number
  setBudgetLeft: React.Dispatch<React.SetStateAction<number>>
}

export default function PlayerPicker({ players, setSelectedPlayers, budgetLeft, setBudgetLeft }: PlayerPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleSelect = (player: Player) => {
    setSelectedPlayers(prev => {
      if (prev.find(p => p.id === player.id)) {
        setBudgetLeft(() => budgetLeft + player.price)
        return prev.filter(p => p.id !== player.id)
      } else {
        setBudgetLeft(() => budgetLeft - player.price)
        return [...prev, player]
      }
    })
    setValue("")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? players.find((player) => player.name === value)?.name
            : "Search player..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search player..." />
          <CommandList>
            <CommandEmpty>No player found</CommandEmpty>
            <CommandGroup>
              {players?.map((player) => (
                <CommandItem
                  key={player.name}
                  value={player.name}
                  onSelect={() => handleSelect(player)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === player.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div>
                  {player.name} ({player.price} kr)
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}