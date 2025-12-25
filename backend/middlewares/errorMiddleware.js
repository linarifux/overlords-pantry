const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // If status code is 200 (OK) but we have an error, default to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose "bad ObjectId" error (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = `Resource not found. The ID ${err.value} is fake news.`;
    statusCode = 404;
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    message = "Duplicate value entered. This already exists in the multiverse.";
    statusCode = 400;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export { notFound, errorHandler };