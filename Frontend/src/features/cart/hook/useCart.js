import { useDispatch } from "react-redux";
import {
  addItem,
  getCart,
  incrementCartItemQuantity,
} from "../service/cart.api";
import {
  addItem as addItemToCart,
  setItems,
  incrementCartItem,
} from "../state/cart.slice";

export const useCart = () => {
  const dispatch = useDispatch();

  async function handleAddItem({ productId, variantId }) {
    const data = await addItem({ productId, variantId });

    return data;
  }

  async function handleGetCart() {
    const data = await getCart();
    dispatch(setItems(data.cart.items));
  }

  async function handleIncrementCartItemQuantity({ productId, variantId }) {
    const data = await incrementCartItemQuantity({ productId, variantId });
    dispatch(incrementCartItem({ productId, variantId }));
    return data;
  }

  return { handleAddItem, handleGetCart, handleIncrementCartItemQuantity };
};
