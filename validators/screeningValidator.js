const Joi = require('joi');
const AppError = require('../utils/AppError');

const schema = Joi.object({
  customerName: Joi.string().trim().min(3).max(100).required(),
  ticketCount: Joi.number().integer().min(1).max(20).required(),
  totalPrice: Joi.number().min(1000).required(),
  screeningDate: Joi.date().iso().required(),
  movieId: Joi.number().integer().positive().required()
}).unknown(false);

exports.validateScreening = (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const pesan = error.details.map((detail) => detail.message).join('; ');
    return next(new AppError(422, pesan, 'VALIDATION_ERROR'));
  }
  req.body = value;
  next();
};
