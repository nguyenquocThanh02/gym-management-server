const express = require("express");
const router = express.Router();
const RegisterTracking = require("../controllers/RegisterTrackingController");
const {
  authUserMiddleWare,
  authUserOrAdminMiddleWare,
  authAdminMiddleWare,
} = require("../middlewares/authMiddleware");

router.post("/add", RegisterTracking.addRegisterTracking);
router.put(
  "/payment/:id",
  authAdminMiddleWare,
  RegisterTracking.paymentRegisterTracking
);

// // router.get('/get-details-order/:id', RegisterTracking.getDetailsOrder)
router.put("/cancel/:id", RegisterTracking.cancelRegisterTracking);
router.get(
  "/get-details/:id",
  authUserOrAdminMiddleWare,
  RegisterTracking.getDetailsRegisterTracking
);
router.get(
  "/get-all-of-user/:id",
  authUserOrAdminMiddleWare,
  RegisterTracking.getAllRegisterTrackingOfUser
);
router.get(
  "/get-all",
  authAdminMiddleWare,
  RegisterTracking.getAllRegisterTracking
);

module.exports = router;
