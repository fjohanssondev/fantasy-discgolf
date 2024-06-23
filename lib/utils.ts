import { db } from "~/lib/db"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* export function constructLeaderboard(users: Player[]) {
  return users.map(player => {
    return {
      name: player.name,
      captain: player.tea.map(({ captain }) => captain),
      points: player.userTeam.reduce((acc: number, curr: Team) => acc + curr.points, 0)
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

export function checkIfUserHasTeamForCurrentSeason(user: any) {
  return user.teams.some((team: Team) => team. === process.env.CURRENT_SEASON)
} */

export async function waitUntil(interval = 100) {
  return new Promise(resolve => setTimeout(resolve, interval))
}

export async function getTeamByUser(userId: string) {
  return await db.team.findFirst({
    where: {
      userId
    }
  })
}

export async function getTeamById(id: string) {
  return await db.team.findFirst({
    where: {
      id
    },
    include: {
      players: true,
      user: {
        select: {
          name: true
        }
      }
    }
  })
}

export async function getPlayers() {
  return await db.player.findMany()
}