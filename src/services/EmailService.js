const nodemailer = require("nodemailer");
const fs = require("fs").promises;
// const { promisify } = require("util");
const path = require("path");
const handlebars = require("handlebars");

// const readFile = promisify(fs.readFile);

// Tạo transporter cho việc gửi email
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Đọc nội dung email từ tệp
const getHtmlContent = async (templateName, variables) => {
  try {
    const templateSource = await fs.readFile(
      `./src/contentEmail/${templateName}`,
      "utf-8"
    );

    const template = handlebars.compile(templateSource);
    const htmlContent = template(variables);

    return htmlContent;
  } catch (error) {
    console.error("Error reading or compiling template file:", error);
    throw error;
  }
};

// Hàm gửi email chung
const sendEmail = async (to, variables = {}, subject, templateName) => {
  const transporter = createTransporter();

  // Thay vì truyền trực tiếp tên template, truyền thêm biến invite_token
  const htmlContent = await getHtmlContent(templateName, variables);

  const info = await transporter.sendMail({
    from: '"GymMax" <2002nguyenquocthanh@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: htmlContent, // HTML content
  });

  return info;
};

// Hàm gửi email đăng ký
const EmailRegister = async (email, invite_token) => {
  return sendEmail(
    email,
    { invite_token: invite_token },
    "Welcome to GymMax!",
    "emailRegister.html"
  );
};

// Hàm gửi email đặt lại mật khẩu
const EmailReset = async (email) => {
  return sendEmail(email, "Password Reset Request", "emailReset.html");
};

// Hàm gửi email xác nhận đã đăng ký gói tập
const EmailConfirm = async (email, detailTracking) => {
  console.log("fff", detailTracking);
  return sendEmail(
    email,
    detailTracking,
    "Email Confirmation",
    "emailConfirm.html"
  );
};

module.exports = {
  EmailRegister,
  EmailReset,
  EmailConfirm,
};
