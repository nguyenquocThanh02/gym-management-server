const express = require("express");
const router = express.Router();
const DeviceController = require("../controllers/DeviceController");
const { authAdminMiddleWare } = require("../middlewares/authMiddleware");

router.post("/add", authAdminMiddleWare, DeviceController.addDevice);
router.post("/update/:id", authAdminMiddleWare, DeviceController.updateDevice);
router.post("/delete/:id", authAdminMiddleWare, DeviceController.deleteDevice);
router.get("/get-all", DeviceController.getAllDevice);
router.get("/get-details/:id", DeviceController.getDetailsDevice);
router.put(
  "/update-status/:id/:status",
  authAdminMiddleWare,
  DeviceController.changeStatusDevice
);

module.exports = router;
