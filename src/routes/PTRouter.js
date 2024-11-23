const express = require("express");
const router = express.Router();
const ptController = require("../controllers/PersonalTrainerController");
const {
  authAdminMiddleWare,
  authTraineeMiddleWare,
} = require("../middlewares/authMiddleware");

router.post("/add", authTraineeMiddleWare, ptController.addPT);
router.post("/update/:id", authTraineeMiddleWare, ptController.updatePT);
router.get("/get-all/:getAll", ptController.getAllPT);
router.get("/get-details/:id", ptController.getDetailsPT);
router.put(
  "/change-status/:id/:status",
  authTraineeMiddleWare,
  ptController.changeStatusPT
);

module.exports = router;
