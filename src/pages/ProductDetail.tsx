import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL
  const product = {
    title: `XX99 Mark II Headphones`, // Mock data based on product ID
    description:
      "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
    price: 2999,
    imgSrc:
      "https://cdn.pixabay.com/photo/2024/04/29/04/21/neon-8726714_640.jpg",
  };

  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto pt-28 p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-40">
      <Card className="bg-white rounded-lg w-full md:w-1/2">
        <img
          className="rounded-lg w-full"
          src={product.imgSrc}
          alt={product.title}
        />
      </Card>

      <div className="mt-5 md:mt-0 md:ml-5 w-full md:w-1/2">
        <Typography variant="h5" className="font-bold text-2xl mb-2">
          {product.title}
        </Typography>
        <Typography className="text-sm text-green-600 mb-4 ">
          NEW PRODUCT
        </Typography>
        <Typography className="mb-4 font-normal text-gray-700">
          {product.description}
        </Typography>
        <Typography className="font-bold text-xl mb-4">
          ${product.price.toLocaleString()}
        </Typography>

        <div className="flex items-center mb-4 gap-8 ">
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
          <Button variant="filled" className="bg-green-800 w-fit rounded-sm">
            ADD TO CART
          </Button>
        </div>

        {/* <Link
          to="/"
          className="inline-block mt-4 text-sm text-blue-600 hover:underline"
        >
          Go Back
        </Link> */}
      </div>
    </div>
  );
};

export default ProductDetail;
