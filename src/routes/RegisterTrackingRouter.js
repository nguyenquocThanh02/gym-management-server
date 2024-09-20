const express = require("express");
const router = express.Router();
const RegisterTracking = require("../controllers/RegisterTrackingController");
const {
  authUserMiddleWare,
  authUserOrAdminMiddleWare,
  authAdminMiddleWare,
} = require("../middlewares/authMiddleware");

router.post("/add", RegisterTracking.addRegisterTracking);
// router.put("/update/:id/:state", RegisterTracking.updateOrder);

// // router.get('/get-details-order/:id', RegisterTracking.getDetailsOrder)
// router.post(
//   "/cancel/:id",
//   authUserOrAdminMiddleWare,
//   RegisterTracking.cancelRegisterTracking
// );
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
