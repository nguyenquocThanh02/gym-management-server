const UserRouter = require("./UserRouter");
const PTRouter = require("./PTRouter");
const DeviceRouter = require("./DeviceRouter");
const PackageRouter = require("./PackageRouter");
const DiscountRouter = require("./DiscountRouter");
const NotifyRouter = require("./NotifyRouter");
const RegisterTrackingRouter = require("./RegisterTrackingRouter");
const ArticalRouter = require("./ArticalRouter");
const EmailRouter = require("./EmailRouter");
const JwtService = require("../services/JwtService");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/personal-trainer", PTRouter);
  app.use("/api/device", DeviceRouter);
  app.use("/api/package", PackageRouter);
  app.use("/api/discount", DiscountRouter);
  app.use("/api/notify", NotifyRouter);
  app.use("/api/register-tracking", RegisterTrackingRouter);
  app.use("/api/artical", ArticalRouter);
  app.use("/api/email", EmailRouter);
  app.post("/api/refreshToken", JwtService.refreshTokenJwtService);
};

module.exports = routes;
