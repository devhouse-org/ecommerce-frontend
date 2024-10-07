import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Mock product list for recommendations
const recommendedProducts = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  title: `PY Tshirt ${index + 1}`,
  description: "Classic t-shirt for daily use.",
  price: 99,
  imgSrc: "https://cdn.pixabay.com/photo/2024/04/29/04/21/neon-8726714_640.jpg",
}));

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL

  // Mock product data
  const product = {
    title: `PY Tshirt ${id}`,
    description: "Classic t-shirt for daily use.",
    price: 100,
    imgSrc:
      "https://cdn.pixabay.com/photo/2024/04/29/04/21/neon-8726714_640.jpg",
  };

  const [quantity, setQuantity] = useState(1);

  // Scroll to top when the product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto pt-28 px-4 md:px-0 flex flex-col md:flex-col md:justify-between md:items-center">
      <div className="flex flex-col md:flex-row justify-center items-center md:gap-20 lg:gap-30 ">
        <Card className="bg-white rounded-lg w-full md:w-1/2">
          <img
            className="rounded-lg w-full"
            src={product.imgSrc}
            alt={product.title}
          />
        </Card>

        <div className="mt-5 md:mt-0 md:ml-5 w-full md:w-1/2  ">
          <p  className="font-bold text-2xl mb-2">
            {product.title}
          </p>
          <p className="text-sm text-green-600 mb-4 ">
            NEW PRODUCT
          </p>
          <p className="mb-4 font-normal text-gray-700">
            {product.description}
          </p>
          <p className="font-semibold text-xl mb-4">
            ${product.price.toLocaleString()}
          </p>

          <div className="flex items-center mb-4 gap-8">
            <div className="bg-gray-200">
              <button
                onClick={handleDecrease}
                className="mr-2 bg-gray-200 hover:bg-gray-300 hover:text-green-600 text-xl px-5 py-2"
              >
                -
              </button>
              <span className="font-bold text-md">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="ml-2 bg-gray-200 hover:bg-gray-300 hover:text-green-600 text-xl px-5 py-2"
              >
                +
              </button>
            </div>
            <Button variant="default" className="bg-green-800 w-fit rounded-sm">
              ADD TO CART
            </Button>
          </div>
        </div>
      </div>

      {/* Recommended Products Section */}
      <div className="w-full mt-20">
        <p
          className="font-bold text-3xl text-center mb-10"
        >
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
                  <p
                    className="mb-2 font-bold tracking-tight text-gray-900"
                  >
                    {product.title}
                  </p>
                </Link>
                <p className="mb-3 font-normal text-gray-700">
                  {product.description}
                </p>
                <p className="font-bold text-lg">
                  ${product.price}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
