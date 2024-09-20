const express = require("express");
const EmailController = require("../controllers/EmailController");

const router = express.Router();

router.post("/sendEmail", EmailController.EmailRegister);

module.exports = router;
