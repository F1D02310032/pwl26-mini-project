const prisma = require('./prisma');

exports.findManyWithMovies = () => prisma.genre.findMany({
  include: { movies: true },
  orderBy: { id: 'asc' }
});

exports.findByIdWithMovies = (id) => prisma.genre.findUnique({
  where: { id: Number(id) },
  include: { movies: true }
});
