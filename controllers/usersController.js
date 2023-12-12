const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const ctrlWrapper = require("../helpers/ctrlWrapper");
const HttpError = require("../helpers/error");

const { SECRET_KEY } = process.env;

// signup
const register = async (req, res) => {
  const { email, password } = req.body;
  const exist = await User.findOne({ email });

  if (exist) {
    // res.status(409).json(HttpError(409, "Email in use"))
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
    },
  });
};

// login
const login = async (req, res) => {
  const { email, password } = req.body;

  const exist = await User.findOne({ email });

  if (!exist) {
    throw HttpError(401, "Email or password is wrong");
  }

  const isPasswordValid = await bcrypt.compare(password, exist.password);
  if (!isPasswordValid) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: exist._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
  console.log(token);

  res.json({ token });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
