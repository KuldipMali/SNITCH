import express from "express";
import {authenticateUser} from "../middleware/auth.middleware.js";
import { validateAddToCart, validateIncrementCartItemQuantity } from "../validator/cart.validator.js";
import { addToCart, getCart,incrementCartItemQuantity } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCart)
router.get("/", authenticateUser,getCart)
router.patch("/quantity/increment/:productId/:variantId", authenticateUser, validateIncrementCartItemQuantity, incrementCartItemQuantity);

export default router;