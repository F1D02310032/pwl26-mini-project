const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE screenings');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE movies');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE genres');
  await prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1');

  const action = await prisma.genre.create({
    data: { name: 'Action', movies: { create: [
      { title: 'Mission ADITYA', director: 'Christopher Nolan', releaseYear: 2026, rating: 8.7, durationMinutes: 145, seats: 10 },
      { title: 'ADITYA: The Final Chapter', director: 'Denis Villeneuve', releaseYear: 2025, rating: 8.4, durationMinutes: 152, seats: 40 }
    ] } }
  });

  const drama = await prisma.genre.create({
    data: { name: 'Drama', movies: { create: [
      { title: 'The Life of ADITYA', director: 'Greta Gerwig', releaseYear: 2024, rating: 9.1, durationMinutes: 128, seats: 45 }
    ] } }
  });

  await prisma.screening.create({
    data: {
      customerName: 'ADITYA - F1D02310032',
      ticketCount: 2,
      totalPrice: 70000,
      screeningDate: new Date('2026-11-20T19:30:00'),
      movieId: (await prisma.movie.findUnique({ where: { title: 'The Life of ADITYA' } })).id
    }
  });

  console.log(`Seed selesai: genres ${action.name}, ${drama.name}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
