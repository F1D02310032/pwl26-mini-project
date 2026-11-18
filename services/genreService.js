const genreData = require('../data/genreData');
const AppError = require('../utils/AppError');

exports.getAll = () => genreData.findManyWithMovies();

exports.getById = async (id) => {
  const genre = await genreData.findByIdWithMovies(id);
  if (!genre) throw new AppError(404, 'Genre tidak ditemukan', 'NOT_FOUND');
  return genre;
};
