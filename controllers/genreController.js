const genreService = require('../services/genreService');
const asyncHandler = require('../utils/asyncHandler');

exports.getAll = asyncHandler(async (req, res) => {
  res.status(200).json(await genreService.getAll());
});

exports.getById = asyncHandler(async (req, res) => {
  res.status(200).json(await genreService.getById(req.params.id));
});
