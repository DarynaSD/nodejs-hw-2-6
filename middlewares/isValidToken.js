const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const HttpError = require("../helpers/error");
const User = require("../models/user");

const isValidToken = async (req, res, next) => {
  const { authorization = "" } = req.headers; // дефолт, щоб не було undefined при непереданому токені
  const [bearer, rowTokenFromFrontend] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }

  // try catch, бо метод verify викидає помилку
  try {
    const { id: _id } = jwt.verify(rowTokenFromFrontend, SECRET_KEY); // перевірка на валідність - чи ми шифрували токен
      const exist = await User.findOne({ _id }); // шукаємо за id (з пейлоада) юзера в базі

    if (!exist || !exist.token || exist.token !== rowTokenFromFrontend) {
      next(HttpError(401, "Not authorized"));
      }
      
    req.user = exist;
    next();
      
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = isValidToken;
