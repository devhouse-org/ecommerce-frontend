import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCartStore } from "../store/index";
import axiosInstance from "@/utils/axiosInstance";
import Spinner from "@/components/Spinner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ShoppingCart, Star, Truck, RefreshCw } from "lucide-react";
import { CartItem } from "@/utils/types";

const ProductDetail = () => {
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hasRated, setHasRated] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const queryClient = useQueryClient();

  const fetchProductById = async (productId: string) => {
    const response = await axiosInstance.get(`/product/${productId}`);
    return response.data;
  };

  const fetchVariantsById = async (productId: string) => {
    const response = await axiosInstance.get(`/variant/product/${productId}`);
    return response.data;
  };

  const checkUserRating = async (productId: string) => {
    const response = await axiosInstance.get(`/rate/check/${productId}`);
    return response.data;
  };

  const { id } = useParams<{ id: string }>();
  const { addToCart, cart, updateQuantity, removeFromCart } = useCartStore();

  const { data: product, isLoading } = useQuery<CartItem>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
  });

  const { data: variants } = useQuery<any[]>({
    queryKey: ["variant", id],
    queryFn: () => fetchVariantsById(id!),
  });

  const { data: userHasRated } = useQuery<boolean>({
    queryKey: ["userRating", id],
    queryFn: () => checkUserRating(id!),
  });

  useEffect(() => {
    if (userHasRated !== undefined) {
      setHasRated(userHasRated);
    }
  }, [userHasRated]);

  const rateMutation = useMutation({
    mutationFn: (ratingData: {
      productId: string;
      score: number;
      comment: string;
    }) => axiosInstance.post("/rate", ratingData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      setHasRated(true);
    },
  });

  const handleRating = () => {
    if (product) {
      rateMutation.mutate({
        productId: product.id,
        score: userRating,
        comment: comment,
      });
    }
  };

  const getAverageRating = (ratings: any[] | undefined) => {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.score, 0);
    return sum / ratings.length;
  };

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

  const quantityInCart =
    cart.find((item) => item.id === product.id)?.quantity || 0;
  const averageRating = getAverageRating(product.ratings);

  // Grouping variants into colors and sizes
  const colors =
    variants?.find((variant) => variant.name === "Color")?.values || [];
  const sizes =
    variants?.find((variant) => variant.name === "Size")?.values || [];

  return (
    <div className="container mx-auto pt-20 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              src={product.image}
              alt={product.name}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {product.name}
          </h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < Math.floor(averageRating) ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              ({averageRating.toFixed(1)})
            </span>
          </div>
          <p className="text-2xl font-semibold text-green-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <p className="mb-6 text-gray-700">{product.description}</p>

          {/* Color Variant Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Choose a color:</h3>
            <div className="flex space-x-2">
              {colors.map((color: any) => (
                <button
                  key={color.id}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color.name
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.name.toLowerCase() }}
                  onClick={() => setSelectedColor(color.name)}
                />
              ))}
            </div>
          </div>

          {/* Size Selection Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Choose a size:</h3>
            <div className="flex space-x-2">
              {sizes.map((size: any) => (
                <button
                  key={size.id}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size.name
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setSelectedSize(size.name)}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="flex items-center mb-6">
            {quantityInCart === 0 ? (
              <button
                className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-3 transition-colors duration-300"
                onClick={() =>
                  addToCart({ ...product, selectedColor, selectedSize }, 1)
                }
                disabled={!selectedColor || !selectedSize}
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center bg-gray-100 rounded-full">
                <button
                  onClick={() => {
                    quantityInCart === 1
                      ? removeFromCart(product.id)
                      : updateQuantity(product.id, quantityInCart - 1);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 text-xl rounded-l-full transition-colors duration-300"
                >
                  -
                </button>
                <span className="font-bold text-lg px-4">{quantityInCart}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                  className="px-4 py-2 hover:bg-gray-200 text-xl rounded-r-full transition-colors duration-300"
                >
                  +
                </button>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <Truck size={20} className="mr-2" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center text-gray-700">
              <RefreshCw size={20} className="mr-2" />
              <span>30-day return policy</span>
            </div>
          </div>

          {/* Rating Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Rate this product</h2>
            {!hasRated ? (
              <div>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={30}
                        className="cursor-pointer"
                        fill={i < userRating ? "currentColor" : "none"}
                        onClick={() => setUserRating(i + 1)}
                      />
                    ))}
                  </div>
                  <span className="ml-2">{userRating}/5</span>
                </div>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Leave a comment"
                />
                <button
                  onClick={handleRating}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors duration-300"
                >
                  Submit
                </button>
              </div>
            ) : (
              <p className="text-green-600">Thank you for your rating!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
