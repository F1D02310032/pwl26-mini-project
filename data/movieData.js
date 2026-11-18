const prisma = require('./prisma');

exports.findMany = ({ page, size, genreId, title }) => {
  const where = {};
  if (genreId) where.genreId = Number(genreId);
  if (title) where.title = { contains: title };
  return prisma.movie.findMany({
    where,
    include: { genre: true },
    skip: (page - 1) * size,
    take: size,
    orderBy: { id: 'asc' }
  });
};

exports.count = ({ genreId, title }) => {
  const where = {};
  if (genreId) where.genreId = Number(genreId);
  if (title) where.title = { contains: title };
  return prisma.movie.count({ where });
};

exports.findById = (id) => prisma.movie.findUnique({
  where: { id: Number(id) },
  include: { genre: true, screenings: true }
});

exports.create = (data) => prisma.movie.create({
  data,
  include: { genre: true }
});

exports.update = (id, data) => prisma.movie.update({
  where: { id: Number(id) },
  data,
  include: { genre: true }
});

exports.remove = (id) => prisma.movie.delete({
  where: { id: Number(id) }
});
