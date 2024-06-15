import { db } from "~/lib/db";

async function main() {

  const season = await db.season.create({
    data: {
      season: 'SEASON_2024',
    },
  });

  const competitions = [
    {
      name: 'DGPT - Chess.com Invitational presented by Discraft',
      eventId: 77775,
      startDate: new Date('23 Feb 2024'),
      endDate: new Date('25 Feb 2024')
    }
  ]

  await Promise.all(competitions.map(async (competition) => {
    await db.competition.create({
      data: {
        name: competition.name,
        startDate: competition.startDate,
        endDate: competition.endDate,
        eventId: competition.eventId,
        seasonId: season.id
      }
    })
  }))
}
  
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });