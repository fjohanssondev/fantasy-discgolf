'use server'

import { redirect } from "next/navigation"
import { auth } from "~/auth"
import { db } from "~/lib/db"

export const handleCreateLeague = async (formData: FormData) => {

  const session = await auth()
  
  const name = formData.get('name') as string
  const doesLeagueExist = await db.league.findFirst({
    where: {
      name
    }
  })

  const user_team = await db.team.findFirst({
    where: {
      userId: session?.user?.id
    }
  })

  if(doesLeagueExist){
    console.log("League already exists")
    return
  } else if(!user_team){
    console.log("User does not have a team")
    return
  }

  const current_season = await db.season.findFirst({
    where: {
      current: true
    }
  })

  const new_league = await db.league.create({
    data: {
      name,
      season: {
        connect: {
          id: current_season?.id
        }
      },
      creator: {
        connect: {
          id: session?.user?.id
        }
      }
    }
  })

  redirect(`/league/${new_league.id}`)
}

export const handleJoinLeague = async (formData: FormData) => {
  const session = await auth()
  const code = formData.get('code') as string

  const league = await db.league.findFirst({
    where: {
      code
    }
  })

  const user_team = await db.team.findFirst({
    where: {
      userId: session?.user?.id
    }
  })

  // TODO: Check if user is already in league

  if(!league){
    console.log("League does not exist")
    return
  } else if(!user_team){
    console.log("User does not have a team")
    return
  }

  const current_users_team = await db.team.findFirst({
    where: {
      userId: session?.user?.id
    }
  })

  await db.league.update({
    where: {
      code
    },
    data: {
      teams: {
        connect: {
          id: current_users_team?.id
        }
      }
    },
  })

  redirect(`/league/${league.id}`)
}