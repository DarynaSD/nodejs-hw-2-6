const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "dasha.dermanchuk@meta.ua",
    pass: META_PASSWORD,
  },
};

// об'єкт, який буде займатися доставкою пошти
const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: "dasha.dermanchuk@gmail.com",
  from: "dasha.dermanchuk@meta.ua",
  subject: "Test nodemailer",
  html: "<p>Test email with nodemailer</p>",
};

transport
  .sendMail(email)
  .then(() => console.log("Email send"))
  .catch((error) => console.log(error.message));
