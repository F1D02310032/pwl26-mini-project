const Joi = require('joi');
const AppError = require('../utils/AppError');

const schema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required(),
  director: Joi.string().trim().min(3).max(100).required(),
  releaseYear: Joi.number().integer().min(1888).max(2100).required(),
  rating: Joi.number().min(0).max(10).required(),
  durationMinutes: Joi.number().integer().min(1).max(1000).required(),
  isAvailable: Joi.boolean().default(true),
  seats: Joi.number().integer().min(0).max(1000).required(),
  genreId: Joi.number().integer().positive().required()
}).unknown(false);

exports.validateMovie = (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const pesan = error.details.map((detail) => detail.message).join('; ');
    return next(new AppError(422, pesan, 'VALIDATION_ERROR'));
  }
  req.body = value;
  next();
};
