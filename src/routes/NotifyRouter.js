const express = require("express");
const router = express.Router();
const NotifyController = require("../controllers/NotifyController");

router.post("/add", NotifyController.addNotify);

module.exports = router;
