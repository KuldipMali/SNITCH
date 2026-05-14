import { useDispatch } from "react-redux";
import {
  addItem,
  getCart,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  deleteCartItem as deleteItem,
} from "../service/cart.api";
import {
  addItem as addItemToCart,
  setCart,
  incrementCartItem,
  decrementCartItem,
  deleteCartItem,
} from "../state/cart.slice";

export const useCart = () => {
  const dispatch = useDispatch();

  async function handleAddItem({ productId, variantId }) {
    const data = await addItem({ productId, variantId });

    return data;
  }

  async function handleGetCart() {
    const data = await getCart();
    dispatch(setCart(data.cart));
  }

  async function handleIncrementCartItemQuantity({ productId, variantId }) {
    const data = await incrementCartItemQuantity({ productId, variantId });
    dispatch(incrementCartItem({ productId, variantId }));
    return data;
  }

  async function handleDecrementCartItemQuantity({ productId, variantId }) {
    const data = await decrementCartItemQuantity({ productId, variantId });
    dispatch(decrementCartItem({ productId, variantId }));
    return data;
  }

  async function handleDeleteCartItem({ productId, variantId }) {
    const data = await deleteItem({ productId, variantId });
    dispatch(deleteCartItem({ productId, variantId }));
    return data;
  }

  return {
    handleAddItem,
    handleGetCart,
    handleIncrementCartItemQuantity,
    handleDecrementCartItemQuantity,
    handleDeleteCartItem,
  };
};
