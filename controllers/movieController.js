const movieService = require('../services/movieService');
const asyncHandler = require('../utils/asyncHandler');

exports.getAll = asyncHandler(async (req, res) => {
  res.status(200).json(await movieService.getAll(req.query));
});

exports.getById = asyncHandler(async (req, res) => {
  res.status(200).json(await movieService.getById(req.params.id));
});

exports.create = asyncHandler(async (req, res) => {
  res.status(201).json(await movieService.create(req.body));
});

exports.update = asyncHandler(async (req, res) => {
  res.status(200).json(await movieService.update(req.params.id, req.body));
});

exports.remove = asyncHandler(async (req, res) => {
  await movieService.remove(req.params.id);
  res.status(204).end();
});
