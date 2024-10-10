import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCartStore } from "../store/index";
import axiosInstance from "@/utils/axiosInstance";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import { CartItem, ProductT } from "@/utils/types";




const ProductDetail = () => {
  const fetchProductById = async (productId: string) => {
    const response = await axiosInstance.get(`/product/${productId}`);
    return response.data; // Return the product data
  };

  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const { addToCart, cart, updateQuantity, removeFromCart } = useCartStore(); // Zustand store for cart actions

  const { data: product, isLoading } = useQuery<CartItem>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Product not found
      </div>
    );
  }

  // Check if product is already in the cart
  const quantityInCart =
    cart.find((item) => item.id === product.id)?.quantity || 0;

  return (
    <div className="container mx-auto pt-28 px-4 md:px-0 flex flex-col md:flex-col md:justify-between md:items-center">
      <div className="flex flex-col md:flex-row justify-center items-center md:gap-20 lg:gap-30">
        <Card className="bg-white rounded-lg w-full md:w-1/2">
          {/* <img
            className="rounded-lg w-full"
            src={product.imageUrl}
            alt={product.title}
          /> */}
          <img
            className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            src={
              "https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c="
            }
            alt={product.name}
          />
        </Card>

        <div className="mt-5 md:mt-0 md:ml-5 w-full md:w-1/2">
          <p className="font-bold text-2xl mb-2">{product.name}</p>
          <p className="text-sm text-green-600 mb-4">NEW PRODUCT</p>
          <p className="mb-4 font-normal text-gray-700">
            {product.description}
          </p>
          <p className="font-semibold text-xl mb-4">
            ${product.price.toFixed(2)}
          </p>
          {/* ADD and Remove (+ -) in Row Style */}
          <div className="flex items-center mb-4 gap-4">
            {/* Quantity Adjustment Section */}
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
                  onClick={() => {
                    quantityInCart === 1
                      ? removeFromCart(product.id)
                      : updateQuantity(product.id, quantityInCart - 1);
                  }}
                  className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 hover:text-green-600 text-xl rounded-l-full"
                >
                  -
                </button>
                <span className="font-bold text-md px-4">{quantityInCart}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                  className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 hover:text-green-600 text-xl rounded-r-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Products Section */}
      {/* <div className="w-full mt-20">
        <p className="font-bold text-3xl text-center mb-10">
          You May Also Like
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {recommendedProducts.map((product) => (
            <Card key={product.id} className="bg-white rounded-lg">
              <Link to={`/product/${product.id}`}>
                <img
                  className="rounded-lg w-full"
                  src={product.imgSrc}
                  alt={product.title}
                />
              </Link>
              <CardContent>
                <Link to={`/product/${product.id}`}>
                  <p className="mt-4 font-bold tracking-tight text-gray-900">
                    {product.title}
                  </p>
                </Link>
                <p className="mb-3 font-normal text-gray-700">
                  {product.description}
                </p>
                <p className="font-bold text-lg">${product.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ProductDetail;
