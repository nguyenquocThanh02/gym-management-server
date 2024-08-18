const nodemailer = require("nodemailer");
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

const readFile = promisify(fs.readFile);

const EmailService = async (email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const filePath = path.join(__dirname, "../email.html");
  const htmlContent = await readFile(filePath, "utf-8");
  const info = await transporter.sendMail({
    from: '"GymMax" <2002nguyenquocthanh@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: htmlContent,
  });
  return info;
};

module.exports = EmailService;
