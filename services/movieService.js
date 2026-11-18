const movieData = require('../data/movieData');
const AppError = require('../utils/AppError');

exports.getAll = async (query) => {
  const halaman = Math.max(Number(query.halaman) || 1, 1);
  const ukuran = Math.min(Math.max(Number(query.ukuran) || 10, 1), 100);
  const filters = { genreId: query.genreId, title: query.judul };
  const [data, total] = await Promise.all([
    movieData.findMany({ page: halaman, size: ukuran, ...filters }),
    movieData.count(filters)
  ]);
  return {
    data,
    pagination: {
      halaman,
      ukuran,
      total,
      totalHalaman: Math.ceil(total / ukuran)
    }
  };
};

exports.getById = async (id) => {
  const movie = await movieData.findById(id);
  if (!movie) throw new AppError(404, 'Film tidak ditemukan', 'NOT_FOUND');
  return movie;
};

exports.create = (data) => movieData.create(data);

exports.update = async (id, data) => {
  const movie = await movieData.findById(id);
  if (!movie) throw new AppError(404, 'Film tidak ditemukan', 'NOT_FOUND');

  throw new Error('Simulasi Error')

  return movieData.update(id, data);
};

exports.remove = async (id) => {
  const movie = await movieData.findById(id);
  if (!movie) throw new AppError(404, 'Film tidak ditemukan', 'NOT_FOUND');
  return movieData.remove(id);
};
