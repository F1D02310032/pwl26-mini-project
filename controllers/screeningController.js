const screeningService = require('../services/screeningService');
const asyncHandler = require('../utils/asyncHandler');

exports.create = asyncHandler(async (req, res) => {
  res.status(201).json(await screeningService.create(req.body));
});
