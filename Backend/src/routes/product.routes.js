import express from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import {
  createProduct,
  getAllProducts,
  getSellerProducts,
} from "../controllers/product.controller.js";
import multer from "multer";
import { createProductValidator } from "../validator/product.validator.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

const router = express.Router();

//For creating a new Product
router.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),
  createProductValidator,
  createProduct,
);

//GET /api/products/seller
//Desc : Get all products of the authenticated seller
//Access : Private (Seller Only )

router.get("/seller", authenticateSeller, getSellerProducts);

router.get("/", getAllProducts);

export default router;
