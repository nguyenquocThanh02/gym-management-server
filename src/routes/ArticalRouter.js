const express = require("express");
const router = express.Router();
const {
  authNormalMiddleWare,
  authUserOrAdminMiddleWare,
  authAdminMiddleWare,
  authUserMiddleWare,
} = require("../middlewares/authMiddleware");
const ArticalController = require("../controllers/ArticalController");
router.post("/add", authNormalMiddleWare, ArticalController.addNewArtical);
router.put(
  "/change-status/:id/:status",
  authAdminMiddleWare,
  ArticalController.changeStatusArtical
);
router.get("/get-all/:status", ArticalController.getAllArticals);
router.get(
  "/get-of-user/:id/:status",
  authUserOrAdminMiddleWare,
  ArticalController.getOfUser
);
router.get("/get-new", ArticalController.getNewArticals);
router.get("/get-details/:id", ArticalController.getDetailsArtical);
router.delete(
  "/delete/:id",
  authAdminMiddleWare,
  ArticalController.deleteArtical
);

module.exports = router;
