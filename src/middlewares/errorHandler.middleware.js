function errorHandlerMiddleware(err, req, res, next) {
  console.log(err)

  const message = {
    Error: err.message
      ? `${err.message}`
      : "Unknown error",
  };

  const status = err.status || 500;

  return res.status(status).json(message);
}

export default errorHandlerMiddleware; 
