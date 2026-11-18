const AppError = require('../utils/AppError');

exports.notFound = (req, res, next) => {
  next(new AppError(404, 'Rute tidak ditemukan', 'ROUTE_NOT_FOUND'));
};

exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  let status = Number.isInteger(err.statusCode)
    ? err.statusCode
    : Number.isInteger(err.status) && err.status < 500
      ? err.status
      : 500;
  let code = err.code || (status === 400 ? 'BAD_REQUEST' : 'INTERNAL_SERVER_ERROR');
  let message = err.message || 'Permintaan tidak valid';

  if (err.type === 'entity.parse.failed') {
    status = 400;
    code = 'BAD_REQUEST';
    message = 'Format JSON tidak valid';
  }

  if (err.code === 'P2002') {
    status = 409;
    code = 'UNIQUE_CONFLICT';
    message = 'Data dengan nilai unik tersebut sudah ada';
  } else if (err.code === 'P2025') {
    status = 404;
    code = 'NOT_FOUND';
    message = 'Data tidak ditemukan';
  }

  if (status >= 500) {
    console.error(err);
    message = 'Terjadi kesalahan pada server';
    code = 'INTERNAL_SERVER_ERROR';
  }

  res.status(status).json({
    error: {
      pesan: message,
      kode: code
    }
  });
};
