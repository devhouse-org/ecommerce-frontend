
import { Settings2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { useQuery } from "@tanstack/react-query"; // Import useQuery
import axiosInstance from "../utils/axiosInstance";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  imgSrc: string;
};

const fetchCategories = async () => {
  const response = await axiosInstance.get("/category");
  return response.data; // Return the data directly
};

const fetchProducts = async (categoryId: number) => {
  const response = await axiosInstance.get(`/product/category/${categoryId}`);
  return response.data; // Return the data directly
};

const Products = () => {
  const { data: categories = [], isPending: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(categories[0]?.id); // Default to first category

  const { data: products = [], isPending: productsLoading } = useQuery<Product[]>({
    queryKey: ["products", selectedCategoryId],
    queryFn: () => fetchProducts(selectedCategoryId),
    enabled: !!selectedCategoryId, // Only run the query if selectedCategoryId is available
  });
   useEffect(()=>{
    setSelectedCategoryId(categories[0]?.id); // Set default category when component mounts and there are categories available
   },[categories])
  // Show loading state for categories
  if (categoriesLoading) {
    return <div>Loading categories...</div>;
  }

  // Show loading state for products
  if (productsLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <>
      <div className="font-bold text-5xl text-center mt-28">
        Man Clothing Collection
      </div>
      <div className="text-center mt-4 text-sm text-gray-500 mx-4">
        Find everything you need to look and feel your best, and shop the latest
        men's fashion and lifestyle products
      </div>

      {/* Category selection */}
      <div className="flex justify-center gap-x-2 mt-10 overflow-x-auto whitespace-nowrap px-4">
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

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 container mx-auto mt-10 gap-10 p-10 md:p-0">
        {products.map((product) => (
          <Card key={product.id} className="bg-white rounded-lg ">
            <Link to={`/product/${product.id}`}>
              {/* Link to product details */}
              <CardHeader>
                <img
                  className="rounded-lg w-full"
                  src={product.imgSrc}
                  alt={product.title}
                />
              </CardHeader>
            </Link>
            <CardContent>
              <Link to={`/product/${product.id}`}>
                <p
                  className="mb-2 font-bold tracking-tight text-gray-900"
                >
                  {product.title}
                </p>
              </Link>
              <p className="mb-3 font-normal text-gray-700">
                {product.description}
              </p>
              <div className="font-bold text-lg">{product.price}$</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Products;
