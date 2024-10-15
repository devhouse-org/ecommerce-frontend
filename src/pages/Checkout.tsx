import { useCartStore } from "../store/index";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { calculateTotalPrice } from "@/utils/help";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { toast } from "sonner";

// Define the schema for order data
const orderSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
});

type OrderFormData = z.infer<typeof orderSchema>;

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity,clearCart } = useCartStore();
  const navigate = useNavigate();
  // Call getTotalPrice to get the calculated total price
  const totalPrice = calculateTotalPrice(cart);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const userId = localStorage.getItem("userId");

  // Fetch user data
  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null;
      const response = await axiosInstance.get(`/users/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });

  // Pre-fill form with user data
  useEffect(() => {
    if (userData) {
      setValue("name", userData.name || "");
      setValue("email", userData.email || "");
      setValue("phoneNumber", userData.phoneNumber || "");
    }
  }, [userData, setValue]);

  // Modify Mutation
  const submitOrder = async (orderData: any) => {
    const response = await axiosInstance.post("/order", orderData);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: submitOrder,
    onSuccess: (data) => {
      console.log("Order submitted successfully:", data);
      toast("Order Successfully Placed", {
        description: "Order ID: " + data.id + " will be delivered to " + data.address,
        action: {
          label: "🎊",
          onClick: () => console.log("great!"),
        },
      })
      // clear cart 
      clearCart()
      navigate("/orders");
    },
    onError: (error) => {
      console.error("Error submitting order:", error);
    },
  });

  const onSubmit = (formData: OrderFormData) => {
    const orderData = {
      userId,
      total: totalPrice,
      Cart: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      status: "PENDING",
      ...formData,
    };

    mutation.mutate(orderData);
  };

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
                  item.image
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
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isUserLoading}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isUserLoading}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isUserLoading}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...register("address")}
                  className="w-full mt-1 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full transition duration-200 ease-in-out transform hover:scale-105"
                disabled={mutation.isPending || isUserLoading}
              >
                {mutation.isPending ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
