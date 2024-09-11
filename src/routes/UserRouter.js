const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authAdminMiddleWare,
  authUserMiddleWare,
  authTraineeMiddleWare,
} = require("../middlewares/authMiddleware");

router.post("/register", userController.register);
router.post("/login/:role", userController.login);
router.post(
  "/invite-account/:email",
  authAdminMiddleWare,
  userController.inviteAccount
);
router.post("/log-out", userController.logoutUser);
router.get(
  "/get-all-trainee",
  authAdminMiddleWare,
  userController.getAllRoleTrainee
);
router.get(
  "/get-all-user",
  authTraineeMiddleWare,
  userController.getAllRoleUser
);
router.get(
  "/get-details/:id",
  authAdminMiddleWare,
  userController.getDetailsUser
);
router.put("/update-user/:id", userController.updateUser);
router.put(
  "/change-status/:id/:status",
  authAdminMiddleWare,
  userController.changeStatus
);
router.put(
  "/change-role/:id/:role",
  authAdminMiddleWare,
  userController.changeRole
);
router.put("/update/:id", authUserMiddleWare, userController.updateUser);
router.delete(
  "/delete-user/:id",
  authAdminMiddleWare,
  userController.deleteUser
);

module.exports = router;
