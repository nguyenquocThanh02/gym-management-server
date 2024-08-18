const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authAdminMiddleWare,
  authUserMiddleWare,
} = require("../middlewares/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/log-out", userController.logoutUser);
router.get("/get-all", userController.getAllUser);
router.get(
  "/get-details/:id",
  authUserMiddleWare,
  userController.getDetailsUser
);
router.put("/update-user/:id", userController.updateUser);
router.delete(
  "/delete-user/:id",
  authAdminMiddleWare,
  userController.deleteUser
);

module.exports = router;
