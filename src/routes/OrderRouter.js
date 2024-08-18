const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
  authUserMiddleWare,
  authMiddleWare,
} = require("../middlewares/auth.middleware");

router.post("/create-order", OrderController.createOrder);
router.put("/update-deliver/:id/:state", OrderController.updateOrder);
router.get("/get-all-ordered-of-user/:id", OrderController.getAllOrderDetails);
// router.get('/get-details-order/:id', OrderController.getDetailsOrder)
router.delete("/cancel-order/:id", OrderController.cancelOrderDetails);
router.get("/get-all-ordered", OrderController.getAllOrder);

module.exports = router;
