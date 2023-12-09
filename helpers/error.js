const HttpError = (status, message) => {
  const error = new Error();
    error.status = status;
    error.message = `httpError: ${message}`;
  return error;
};

module.exports = HttpError;
