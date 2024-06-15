import { User, UserTeam } from "@prisma/client"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructLeaderboard(users: UserWithTeams[]) {
  return users.map(player => {
    return {
      name: player.name,
      captain: player.userTeam.map(({ captain }) => captain),
      points: player.userTeam.reduce((acc: number, curr: UserTeam) => acc + curr.points, 0)
    }
  }).sort((a, b) => b.points - a.points)
}

export function formatTimeLeft(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const days = Math.floor(totalSeconds / (3600 * 24))
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}