const express = require("express");
const router = express.Router();
const DiscountController = require("../controllers/DiscountController");
const { authAdminMiddleWare } = require("../middlewares/authMiddleware");

router.post("/add", authAdminMiddleWare, DiscountController.addDiscount);
router.put(
  "/update/:id",
  authAdminMiddleWare,
  DiscountController.updateDiscount
);

router.get("/get-all", DiscountController.getAllDiscount);
router.get("/get-active", DiscountController.getActiveDiscount);
router.get("/get-details/:id", DiscountController.getDetailsDiscount);
router.put(
  "/update-status/:id/:status",
  authAdminMiddleWare,
  DiscountController.changeStatusDiscount
);

module.exports = router;
