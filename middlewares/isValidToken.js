const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const HttpError = require("../helpers/error");
const User = require("../models/user");

const isValidToken = async (req, res, next) => {
  const { authorization = "" } = req.headers; // дефолт, щоб не було undefined при непереданому токені
  const [bearer, rowTokenFromFrontend] = authorization.split(" ");
  console.log(rowTokenFromFrontend);
  console.log(bearer);
  // try catch, бо метод verify викидає помилку
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(rowTokenFromFrontend, SECRET_KEY); // перевірка на валідність - чи ми шифрували токен
    const user = await User.findOne({ id }); // шукаємо за id (з пейлоада) юзера в базі

    if (!user) {
      next(HttpError(401, "Not authorized"));
    }

    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = isValidToken;
