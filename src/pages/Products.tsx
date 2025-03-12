import {
  CircleX,
  Heart,
  Search,
  Settings2,
  ShoppingCart,
  Scale,
} from "lucide-react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for routing and useNavigate for navigation
import { useQuery } from "@tanstack/react-query"; // Import useQuery
import axiosInstance from "../utils/axiosInstance";
import {
  useCartStore,
  useWishlistStore,
  useComparisonStore,
} from "../store/index";
import Spinner from "@/components/Spinner";
import { Category, ProductListProps } from "@/utils/types";

const fetchCategories = async () => {
  const response = await axiosInstance.get("/category");
  return response.data;
};

const Products = () => {
  const { data: categories = [], isLoading: categoriesLoading } = useQuery<
    Category[]
  >({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart, cart, removeFromCart, updateQuantity } = useCartStore(); // Access Zustand store
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore();
  const { addToComparison, removeFromComparison, comparisonList } =
    useComparisonStore();
  const navigate = useNavigate();

  const { data: products = [], isLoading: productsLoading } = useQuery<
    ProductListProps[]
  >({
    queryKey: ["products", selectedCategoryId],
    queryFn: async ({ queryKey }) => {
      const [_, categoryId] = queryKey;
      const url = categoryId ? `/product/category/${categoryId}` : "/product";
      const response = await axiosInstance.get(url);
      return response.data;
    },
  });

  // Function to scroll the selected category to the center
  const scrollToCenter = (categoryId: string | undefined) => {
    if (!categoriesRef.current) return;

    const container = categoriesRef.current;
    const selectedButton = container.querySelector(
      `[data-category-id="${categoryId}"]`
    ) as HTMLElement;

    if (selectedButton) {
      const containerWidth = container.offsetWidth;
      const buttonWidth = selectedButton.offsetWidth;
      const scrollLeft =
        selectedButton.offsetLeft - containerWidth / 2 + buttonWidth / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

  // Update the category selection function
  const handleCategorySelect = (categoryId: string | undefined) => {
    setSelectedCategoryId(categoryId);
    scrollToCenter(categoryId);
  };

  // Show loading state for categories
  if (categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-screen self-center mx-auto">
        <Spinner />
      </div>
    );
  }

  // Function to get the quantity of a specific product in the cart
  const getQuantityInCart = (productId: string) => {
    const cartItem = cart.find((item) => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isInWishlist = (productId: string) =>
    wishlist.some((item: { id: string }) => item.id === productId);

  const isInComparison = (productId: string) =>
    comparisonList.some((item: { id: string }) => item.id === productId);

  return (
    <>
      <div className="font-bold text-5xl text-center pt-28">
        Man Clothing Collection
      </div>
      <div className="text-center mt-4 text-sm text-gray-500 mx-4">
        Find everything you need to look and feel your best, and shop the latest
        men's fashion and lifestyle products.
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 mt-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 shadow-lg"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <div className="flex items-center justify-end absolute right-10 top-1/4">
            <CircleX
              onClick={() => setSearchTerm("")}
              size={24}
              className="text-gray-400 hover:text-green-500 transition"
            />
          </div>
          {/* <div className="flex items-center justify-end absolute rounded-full  bg-green-500 right-6 top-1/4 ">
            <button className="">Search</button>
          </div> */}
        </div>
      </div>

      {/* Category selection */}
      <div className="container mx-auto px-4 mt-10">
        <div
          ref={categoriesRef}
          className="flex overflow-x-auto justify-center whitespace-nowrap pb-4 scrollbar-hide"
        >
          <button
            data-category-id="undefined"
            onClick={() => handleCategorySelect(undefined)}
            className={`text-sm font-medium rounded-full px-3 py-2 transition-all duration-300 ease-in-out flex-shrink-0 mr-3 ${
              selectedCategoryId === undefined
                ? "text-white bg-green-600 shadow-md hover:bg-green-700"
                : "text-gray-700 bg-gray-100 hover:bg-gray-200"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              data-category-id={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`text-sm font-medium rounded-full px-3 py-2 transition-all duration-300 ease-in-out flex-shrink-0 mr-3 ${
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
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 flex-shrink-0"
          >
            <Settings2 size={20} className="text-gray-600" />
          </Link>
        </div>
      </div>

      {/* Card Section */}
      <div className="container mx-auto mt-10 px-4">
        {productsLoading ? (
          <div className="flex justify-center items-center h-screen self-center mx-auto">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const quantityInCart = getQuantityInCart(product.id);
              const productInWishlist = isInWishlist(product.id);
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
                      src={product.image}
                      alt={product.name}
                    />
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-green-600 transition-colors">
                        {product.name}
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
                    <div className="flex gap-2">
                      {quantityInCart === 0 ? (
                        <>
                          <button
                            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-1.5 transition-colors duration-300"
                            onClick={() => addToCart(product, 1)}
                          >
                            <ShoppingCart size={18} className="mr-2" />
                            Add to Cart
                          </button>
                          <button
                            className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-1.5 transition-colors duration-300"
                            onClick={() => {
                              addToCart(product, 1);
                              navigate("/checkout");
                            }}
                          >
                            Buy Now
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center bg-gray-200 rounded-full">
                          <button
                            className="px-3 py-1 text-gray-600 hover:text-green-600 transition-colors"
                            onClick={() => {
                              quantityInCart === 1
                                ? removeFromCart(product.id)
                                : updateQuantity(
                                    product.id,
                                    quantityInCart - 1
                                  );
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
                    </div>

                    <div className="flex space-x-2">
                      <button
                        className={`text-gray-600 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-200 ${
                          productInWishlist ? "text-red-500" : ""
                        }`}
                        onClick={() =>
                          productInWishlist
                            ? removeFromWishlist(product.id)
                            : addToWishlist(product)
                        }
                      >
                        <Heart
                          size={20}
                          fill={productInWishlist ? "currentColor" : "none"}
                        />
                      </button>
                      <button
                        className={`text-gray-600 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-gray-200 ${
                          isInComparison(product.id) ? "text-blue-500" : ""
                        }`}
                        onClick={() =>
                          isInComparison(product.id)
                            ? removeFromComparison(product.id)
                            : addToComparison(product)
                        }
                      >
                        <Scale
                          size={20}
                          fill={
                            isInComparison(product.id) ? "currentColor" : "none"
                          }
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
