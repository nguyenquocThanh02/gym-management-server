const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { authMiddleWare } = require("../middlewares/auth.middleware");

router.post("/create", ProductController.createProduct);
router.put("/update/:id", ProductController.updateProduct);
router.get("/get-details/:id", ProductController.getDetailsProduct);
router.delete("/delete/:id", ProductController.deleteProduct);
router.get("/getAll", ProductController.getAllProduct);
// router.post('/delete-many', authMiddleWare, ProductController.deleteMany)
router.get("/get-all-type", ProductController.getAllType);

module.exports = router;
