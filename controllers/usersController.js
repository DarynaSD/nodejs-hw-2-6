const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");


const User = require("../models/user");

const ctrlWrapper = require("../helpers/ctrlWrapper");
const HttpError = require("../helpers/error");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../public/avatars");

// signup
const register = async (req, res) => {
  const { email, password } = req.body;
  const exist = await User.findOne({ email });

  if (exist) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

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
  await User.findByIdAndUpdate(exist._id, { token });

  res.json({ token });
};

// get current user
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

// logout
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json(null);
};

// update avatar
const avatar = async (req, res) => {
  const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;
  const uniqName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, uniqName);

  try {
    const image = await Jimp.read(tempUpload);
    image.resize(250, 250).write(resultUpload);
  } catch (error) {
    throw HttpError(500, "Can't resize avatar");
  }

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", uniqName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  avatar: ctrlWrapper(avatar),
};
