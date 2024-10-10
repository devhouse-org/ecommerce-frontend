import { useCartStore } from "../store/index";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { calculateTotalPrice } from "@/utils/help";

const CheckoutPage = () => {
  const { cart, removeFromCart, updateQuantity } =
    useCartStore();

  // Call getTotalPrice to get the calculated total price
  const totalPrice = calculateTotalPrice(cart);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto pt-28 px-4 md:px-0 flex flex-col items-center justify-center h-screen">
        <ShoppingBag size={64} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-28 px-4 md:px-0 flex flex-col md:flex-row md:justify-between md:items-start">
      <div className="w-full md:w-2/3 mb-8 md:mb-0 md:mr-8">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        {cart.map((item) => (
          <Card
            key={item.id}
            className="mb-4 bg-white rounded-lg overflow-hidden"
          >
            <CardContent className="p-4 flex items-center">
              <img
                className="w-24 h-24 object-cover rounded-lg mr-4"
                src={
                  item.imageUrl ||
                  "https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c="
                }
                alt={item.name}
              />
              <div className="flex-grow">
                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-l-full"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-200 text-gray-700">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-r-full"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="w-full md:w-1/3">
        <Card className="bg-white rounded-lg">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
              <span>Total</span>
              <span>${totalPrice}</span>
            </div>
            <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded-full">
              Proceed to Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
