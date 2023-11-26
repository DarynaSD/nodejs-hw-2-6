const HttpError = (status, message) => {
  const error = new Error();
    error.status = status;
    error.message = message;
  return error;
};

module.exports = HttpError;

  // {
  //   "id": "vza2RIzNGIwutCVCs4mCL",
  //   "name": "Wylie Pope",
  //   "email": "est@utquamvel.net",
  //   "phone": "(692) 802-2949"
  // }