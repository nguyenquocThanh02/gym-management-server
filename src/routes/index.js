const UserRouter = require("./UserRouter");
const PTRouter = require("./PTRouter");
const DeviceRouter = require("./DeviceRouter");
const PackageRouter = require("./PackageRouter");
const DiscountRouter = require("./DiscountRouter");

// const ProductRouter = require("./ProductRouter");
// const OrderRouter = require("./OrderRouter");
const EmailRouter = require("./EmailRouter");
// const Notification = require("./Notification");
const JwtService = require("../services/JwtService");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/personal-trainer", PTRouter);
  app.use("/api/device", DeviceRouter);
  app.use("/api/package", PackageRouter);
  app.use("/api/discount", DiscountRouter);
  // app.use("/api/product", ProductRouter);
  // app.use("/api/order", OrderRouter);
  app.use("/api/email", EmailRouter);
  // app.use("/api/notify", Notification);
  app.post("/api/refreshToken", JwtService.refreshTokenJwtService);
};

module.exports = routes;
