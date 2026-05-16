import express from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  validateAddToCart,
  validateDecrementCartItemQuantity,
  validateIncrementCartItemQuantity,
} from "../validator/cart.validator.js";
import {
  addToCart,
  createOrderController,
  decrementCartItemQuantity,
  deleteCartItem,
  getCart,
  incrementCartItemQuantity,
  verifyOrderController,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post(
  "/add/:productId/:variantId",
  authenticateUser,
  validateAddToCart,
  addToCart,
);
router.get("/", authenticateUser, getCart);
router.patch(
  "/quantity/increment/:productId/:variantId",
  authenticateUser,
  validateIncrementCartItemQuantity,
  incrementCartItemQuantity,
);
router.patch(
  "/quantity/decrement/:productId/:variantId",
  authenticateUser,
  validateDecrementCartItemQuantity,
  decrementCartItemQuantity,
);

router.delete("/", authenticateUser, deleteCartItem);

router.post("/payment/create/order", authenticateUser, createOrderController);

router.post("/payment/verify/order", authenticateUser, verifyOrderController);

export default router;
