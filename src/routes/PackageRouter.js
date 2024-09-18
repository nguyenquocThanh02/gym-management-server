const express = require("express");
const router = express.Router();
const PackageController = require("../controllers/PackageController");
const { authAdminMiddleWare } = require("../middlewares/authMiddleware");

router.post("/add", authAdminMiddleWare, PackageController.addPackage);
router.put("/update/:id", authAdminMiddleWare, PackageController.updatePackage);
router.post(
  "/delete/:id",
  authAdminMiddleWare,
  PackageController.deletePackage
);
router.get("/get-all", PackageController.getAllPackage);
router.get("/get-all-name", PackageController.getAllPackageName);
router.get("/get-popular", PackageController.getPopularPackage);
router.get("/get-details/:id", PackageController.getDetailsPackage);
router.put(
  "/update-status/:id/:status",
  authAdminMiddleWare,
  PackageController.changeStatusPackage
);

module.exports = router;
