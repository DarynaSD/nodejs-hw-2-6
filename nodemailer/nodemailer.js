const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, META_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_EMAIL,
    pass: META_PASSWORD,
  },
};

// об'єкт, який буде займатися доставкою пошти
const transport = nodemailer.createTransport(nodemailerConfig);

// const emailData = {
//   to: "dasha.dermanchuk@gmail.com",
//   // from: "dasha.dermanchuk@meta.ua",
//   subject: "Test nodemailer",
//   html: "<p>Test email with nodemailer</p>",
// };

// transport
//   .sendMail(email)
//   .then(() => console.log("Email send"))
//   .catch((error) => console.log(error.message));

const sendEmail = async(emailData) => {
    const email = {...emailData, from: META_EMAIL};
    return transport.sendMail(email);
}

module.exports = sendEmail;