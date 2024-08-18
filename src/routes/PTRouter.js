const express = require("express");
const router = express.Router();
const ptController = require("../controllers/PersonalTrainerController");
const { authAdminMiddleWare } = require("../middlewares/authMiddleware");

router.post("/add", authAdminMiddleWare, ptController.addPT);
router.post("/update/:id", authAdminMiddleWare, ptController.updatePT);
router.get("/get-all", ptController.getAllPT);
router.get("/get-details/:id", ptController.getDetailsPT);
router.put(
  "/change-status/:id/:status",
  authAdminMiddleWare,
  ptController.changeStatusPT
);

module.exports = router;
