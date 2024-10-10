import { CartItem } from "./types";

export function calculateTotalPrice(products:CartItem[]) {
    return products.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  }