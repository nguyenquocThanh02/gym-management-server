const express = require("express");
const router = express.Router();
const RegisterTracking = require("../controllers/RegisterTrackingController");
const {
  authUserMiddleWare,
  authUserOrAdminMiddleWare,
  authAdminMiddleWare,
  authTraineeMiddleWare,
} = require("../middlewares/authMiddleware");

router.post("/add", RegisterTracking.addRegisterTracking);
router.put(
  "/payment/:id",
  authAdminMiddleWare,
  RegisterTracking.paymentRegisterTracking
);
router.put(
  "/add-pt-to-rt/:idRT/:idPT",
  authTraineeMiddleWare,
  RegisterTracking.addPTtoRT
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
  "/get-detailbyName/:name",
  authTraineeMiddleWare,
  RegisterTracking.getDetailsByName
);
router.get(
  "/get-all",
  authAdminMiddleWare,
  RegisterTracking.getAllRegisterTracking
);
router.get(
  "/get-all-for-calendar",
  // authTraineeMiddleWare,
  RegisterTracking.getAllForCalendar
);

router.get(
  "/get-chart-date/:date",
  authAdminMiddleWare,
  RegisterTracking.getChartDate
);

router.get(
  "/get-chart-month/:month",
  authAdminMiddleWare,
  RegisterTracking.getChartMonth
);

module.exports = router;
