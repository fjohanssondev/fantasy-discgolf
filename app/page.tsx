import { auth } from "~/auth";
import { db } from "~/lib/db";
import CreateTeam from "~/components/create_team";

export default async function Dashboard() {
  const session = await auth()
  
  const my_team = await db.team.findFirst({
    where: {
      userId: session?.user?.id
    }
  })

  return (
    <section>
      <h1 className="mb-4">Dashboard</h1>
      {!my_team && <section className="flex justify-center"><CreateTeam /></section>}
    </section>
  );
}
