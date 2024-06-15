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
import { Player } from "~/types/types"

export interface PlayerSelectionProps {
  players: Player[]
  team: Player[]
  setTeam: any
}

export default function PlayerSelection({ players, team, setTeam }: PlayerSelectionProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

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
            ? players?.find((player) => player.name === value)?.name
            : "Välj spelare..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Sök spelare..." />
          <CommandList>
            <CommandEmpty>Ingen spelare hittad.</CommandEmpty>
            <CommandGroup>
              {players?.map((player) => (
                <CommandItem
                  key={player.name}
                  value={player.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)

                    if (!team.some((p) => p.pdga_number === player.pdga_number) && team.length < 5) {
                      setTeam((prev) => [
                        ...prev,
                        {
                          pdga_number: player.pdga_number,
                          name: player.name,
                        },
                      ]);
                    }

                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === player.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {player.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}