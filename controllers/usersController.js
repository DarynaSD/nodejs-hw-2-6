const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const {nanoid} = require("nanoid");

const User = require("../models/user");

const ctrlWrapper = require("../helpers/ctrlWrapper");
const HttpError = require("../helpers/error");
const sendEmail = require("../nodemailer/nodemailer");

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join(__dirname, "../public/avatars");

// SIGNUP
const register = async (req, res) => {
  const { email, password } = req.body;
  const exist = await User.findOne({ email });

  if (exist) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

          // verification
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<p>Click <a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">here</a> to verify email</p>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: "starter",
    },
  });
};

// VERIFY
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const exist = await User.findOne({ verificationToken });

  if (!exist) {
        throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(exist._id, { verify: true, verificationToken: null });

  res.status(200).json({message: "Verification successful"})
}

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  const exist = await User.findOne({ email });

  if (!exist) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!exist.verify) {
        throw HttpError(401, "Verify your email and try again");
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

// GET CURRENT USER
const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

// LOGOUT
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json(null);
};

// UPDATE AVATAR
const avatar = async (req, res) => {
  const { _id } = req.user;

  if (!req.file) {
    throw HttpError(400, "File not attached. Attach the file and try again.");
  }

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
  verifyEmail: ctrlWrapper(verifyEmail),
};
