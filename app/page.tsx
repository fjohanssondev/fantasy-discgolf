import Link from "next/link";
import { auth } from "~/auth";
import { db } from "~/lib/db";

export interface Player {
  name: string
  points: number
}

export default async function Home() {
  const session = await auth()
  
  const my_team = await db.team.findFirst({
    where: {
      userId: session?.user?.id
    }
  })

  return (
    <section>
      <h1 className="mb-4">Dashboard</h1>
      {!my_team && <section className="flex justify-center"><Link href="/team/create">Create Team</Link></section>}
    </section>
  );
}
