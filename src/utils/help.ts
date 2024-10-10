import { CartItem } from "./types";

export function calculateTotalPrice(cart:CartItem[]) {
    return cart.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  }