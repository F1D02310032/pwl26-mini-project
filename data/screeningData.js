const prisma = require('./prisma');
const AppError = require('../utils/AppError');

exports.createAndReduceSeats = (data) => prisma.$transaction(async (tx) => {
  const movie = await tx.movie.findUnique({
    where: { id: Number(data.movieId) }
  });

  if (!movie) {
    throw new AppError(404, 'Film tidak ditemukan', 'NOT_FOUND');
  }
  if (movie.seats < data.ticketCount) {
    throw new AppError(409, 'Kursi tidak mencukupi', 'INSUFFICIENT_SEATS');
  }

  const screening = await tx.screening.create({
    data: {
      customerName: data.customerName,
      ticketCount: data.ticketCount,
      totalPrice: data.totalPrice,
      screeningDate: new Date(data.screeningDate),
      movieId: Number(data.movieId)
    },
    include: { movie: true }
  });

  await tx.movie.update({
    where: { id: Number(data.movieId) },
    data: { seats: { decrement: data.ticketCount } }
  });

  return screening;
});
