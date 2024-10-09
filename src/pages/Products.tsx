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
  imgSrc: string;
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

  const { addToCart, cart } = useCartStore(); // Access addToCart from Zustand store

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
      setSelectedCategoryId(categories[0]?.id); // Set default category when component mounts and there are categories available
    }
  }, [categories]);

  // Show loading state for categories
  if (categoriesLoading) {
    return (
      <div className="flex justify-center items-center h-full self-center mx-auto mt-4">
        <Spinner />
      </div>
    );
  }

  // Show loading state for products
  if (productsLoading) {
    return (
      <div className="flex justify-center items-center h-full self-center mx-auto mt-4">
        <Spinner />
      </div>
    );
  }
  console.log(cart);

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
      <div className="flex justify-start xl:justify-center gap-x-2 mt-10 overflow-x-auto whitespace-nowrap px-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            className={`text-sm rounded-full px-5 py-2 border-2 ${
              selectedCategoryId === category.id
                ? "text-white bg-black border-white"
                : "text-black border-black"
            }`}
          >
            {category.name}
          </button>
        ))}
        <Link
          to="/settings"
          className="border-2 rounded-full px-2 border-black"
        >
          <Settings2 className="mt-1" />
        </Link>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 container mx-auto mt-10 gap-10">
        {categoryWithProducts?.products.map((product) => (
          <Card key={product.id} className="border-none shadow-none">
            <Link to={`/product/${product.id}`}>
              <CardHeader>
                {/* <img
                className="rounded-t-lg"
                src={
                  "https://media.istockphoto.com/id/1018293976/photo/attractive-fashionable-woman-posing-in-white-trendy-sweater-beige-pants-and-autumn-heels-on.jpg?s=612x612&w=0&k=20&c=_CLawpZw6l9z0uV4Uon-7lqaS013E853ub883pkIK3c="
                }
                alt={product.title}
              /> */}
                <img
                  className="rounded-t-lg"
                  src={product.imageUrl}
                  alt={product.title}
                />
              </CardHeader>
            </Link>
            <Link to={`/product/${product.id}`}>
              <CardContent>
                <CardTitle className="font-bold mb-2 text-lg">
                  {product.title}
                </CardTitle>
                <CardDescription>{product.description}</CardDescription>
                <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
              </CardContent>
            </Link>
            <CardFooter className="">
              <Button
                className="text-gray-700 size-10 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                onClick={() => addToCart(product, 1)} // Add to cart with quantity 1
              >
                <ShoppingCart size={20} />
              </Button>
              <Button className="text-gray-700 size-10 p-1 rounded-full hover:bg-gray-100 cursor-pointer">
                <Heart size={20} />
              </Button>
              <Button className="text-gray-700 size-10 p-1 rounded-full hover:bg-gray-100 cursor-pointer">
                <TableColumnsSplit size={20} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Products;
