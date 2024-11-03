const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Tạo tooken với thời gian sống là 1h
const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "600s" }
  );

  return access_token;
};

// Tạo 1 refresh tooken với thời gian sống là 1y
const genneralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.REFRESH_TOKEN,
    { expiresIn: "1d" }
  );

  return refresh_token;
};

// Xác thực lại refresh tooken
const refreshTokenJwtService = (req, res) => {
  const token = req.body.refreshToken;
  jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
    if (err) {
      return res.status(403).json({
        status: "ERR",
        message: "Invalid refresh token",
      });
    }
    try {
      const access_token = await genneralAccessToken({
        id: user?.id,
        role: user?.role || "",
      });
      res.json({
        status: "OK",
        message: "SUCCESS",
        access_token,
      });
    } catch (error) {
      console.error("Error generating access token:", error);
      res.status(500).json({
        status: "ERR",
        message: "Failed to generate access token",
      });
    }
  });
};

// Tạo tooken cho invite trainee
const genneralTokenInvite = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.INVITE_TOKEN,
    { expiresIn: "3d" }
  );

  return access_token;
};

const genneralTokenResetPasword = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.RESET_TOKEN,
    { expiresIn: "300s" }
  );

  return access_token;
};
module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
  refreshTokenJwtService,
  genneralTokenInvite,
  genneralTokenResetPasword,
};
