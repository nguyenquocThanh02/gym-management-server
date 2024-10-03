const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authNormalMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: "The authemtication",
        status: "ERROR",
      });
    }
    next();
  });
};

// Kiểm tra quyền admin bằng xác thực tooken
const authAdminMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: "The authemtication",
        status: "ERROR",
      });
    }
    if (user?.role === "admin") {
      next();
    } else {
      return res.status(404).json({
        message: "Permition admin role",
        status: "ERROR",
      });
    }
  });
};

const authTraineeMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: "The authemtication",
        status: "ERROR",
      });
    }
    console.log(user);
    if (user?.role === "trainee" || user?.role === "admin") {
      next();
    } else {
      return res.status(404).json({
        message: "Permition admin role",
        status: "ERROR",
      });
    }
  });
};

// Xác thực user
const authUserMiddleWare = (req, res, next) => {
  const token = req.headers?.token?.split(" ")[1] || null;

  if (!token) {
    return res.status(401).json({
      message: "Token is not defined!",
      status: "401",
    });
  }
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: "The authemtication",
        status: "401",
      });
    }
    if (user?.id === userId) {
      next();
    } else {
      return res.status(401).json({
        message: "The authemtication",
        status: "401",
      });
    }
  });
};

const authUserOrAdminMiddleWare = (req, res, next) => {
  const token = req.headers?.token?.split(" ")[1] || null;

  if (!token) {
    return res.status(401).json({
      message: "Token is not defined!",
      status: "401",
    });
  }
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(401).json({
        message: "The authemtication",
        status: "401",
      });
    }
    if (user?.id === userId) {
      next();
    } else if (user?.role === "admin") {
      next();
    } else {
      return res.status(404).json({
        message: "Permition admin role",
        status: "ERROR",
      });
    }
  });
};

module.exports = {
  authAdminMiddleWare,
  authUserMiddleWare,
  authTraineeMiddleWare,
  authUserOrAdminMiddleWare,
  authNormalMiddleWare,
};
