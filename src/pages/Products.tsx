import {
  CarTaxiFront,
  Heart,
  Settings2,
  ShoppingCart,
  TableColumnsSplit,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { useQuery } from "@tanstack/react-query"; // Import useQuery
import axiosInstance from "../utils/axiosInstance";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "../store/index";
import Spinner from "@/components/Spinner";

type Category = {
  id: string;
  name: string;
};

type ProductT = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
};

type ProductListProps = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  products: ProductT[];
};

const fetchCategories = async () => {
  const response = await axiosInstance.get("/category");
  return response.data; // Return the data directly
};

const fetchProducts = async (categoryId: string) => {
  const response = await axiosInstance.get(`/product/category/${categoryId}`);
  return response.data; // Return the data directly
};

const Products = () => {
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<
    Category[]
  >({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { addToCart, cart, removeFromCart, updateQuantity } = useCartStore(); // Access Zustand store
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined); // Default to undefined

  const { data: categoryWithProducts, isLoading: productsLoading } =
    useQuery<ProductListProps>({
      queryKey: ["products", selectedCategoryId],
      queryFn: () => fetchProducts(selectedCategoryId!),
      enabled: !!selectedCategoryId, // Only run the query if selectedCategoryId is available
    });

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategoryId(categories[0]?.id); // Set default category when component mounts
    }
  }, [categories]);

  // Show loading state for categories
  if (categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-screen self-center mx-auto">
        <Spinner />
      </div>
    );
  }

  // Show loading state for products
  if (productsLoading) {
    return (
      <div className="flex justify-center h-screen items-center self-center mx-auto">
        <Spinner />
      </div>
    );
  }

  // Function to get the quantity of a specific product in the cart
  const getQuantityInCart = (productId: string) => {
    const cartItem = cart.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <>
      <div className="font-bold text-5xl text-center pt-28">
        Man Clothing Collection
      </div>
      <div className="text-center mt-4 text-sm text-gray-500 mx-4">
        Find everything you need to look and feel your best, and shop the latest
        men's fashion and lifestyle products.
      </div>

      {/* Category selection */}
      <div className="container mx-auto px-4 mt-10">
        <div className="flex flex-wrap gap-y-4 2xl:gap-y-0 justify-start xl:justify-center gap-x-3 overflow-x-auto whitespace-nowrap pb-4 scrollbar-custom ">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`text-sm font-medium rounded-full px-3 py-2 transition-all duration-300 ease-in-out ${
                selectedCategoryId === category.id
                  ? "text-white bg-green-600 shadow-md hover:bg-green-700"
                  : "text-gray-700 bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
          <Link
            to="/settings"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
          >
            <Settings2 size={20} className="text-gray-600" />
          </Link>
        </div>
      </div>

      {/* Card Section */}
      <div className="container mx-auto mt-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryWithProducts?.products.map((product) => {
            const quantityInCart = getQuantityInCart(product.id); // Get quantity for this product
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="block overflow-hidden"
                >
                  <img
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                    src={
                      "https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c="
                    }
                    alt={product.title}
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-green-600 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="font-bold text-lg text-green-600">
                      ${product.price.toFixed(2)}
                    </p>
                  </Link>
                </div>
                <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
                  {quantityInCart === 0 ? (
                    <button
                      className="flex items-center justify-center bg-green-600 hover:bg-green-600 text-white rounded-full px-4 py-1.5 transition-colors duration-300"
                      onClick={() => addToCart(product, 1)} // Add to cart with quantity 1
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center bg-gray-200 rounded-full">
                      <button
                        className="px-3 py-1 text-gray-600 hover:text-green-600 transition-colors"
                        onClick={() => {
                          quantityInCart === 1
                            ? removeFromCart(product.id)
                            : updateQuantity(product.id, quantityInCart - 1);
                        }}
                      >
                        -
                      </button>
                      <span className="px-3 font-semibold">
                        {quantityInCart}
                      </span>
                      <button
                        className="px-3 py-1 text-gray-600 hover:text-green-600 transition-colors"
                        onClick={() =>
                          updateQuantity(product.id, quantityInCart + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <button className="text-gray-600 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-200">
                      <Heart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
