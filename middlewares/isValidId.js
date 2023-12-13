const { isValidObjectId } = require("mongoose");
const HttpError = require("../helpers/error");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    //   next(HttpError(400, `${contactId} is not valid id`));
    next(HttpError(404, "Not found"));

  }
  next();
};

module.exports = isValidId;
