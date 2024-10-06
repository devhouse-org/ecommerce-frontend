import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Settings2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing

type Props = {};

const Products = (props: Props) => {
  const cards = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    title: `PY Tshirt ${index + 1}`,
    description: "Classic t-shirt for daily use.",
    price: 99,
    imgSrc:
      "https://cdn.pixabay.com/photo/2024/04/29/04/21/neon-8726714_640.jpg",
  })); // Creates an array of product objects

  return (
    <>
      <div className="font-bold text-5xl text-center mt-28">
        Man Clothing Collection
      </div>
      <div className="text-center mt-4 text-sm text-gray-500 mx-4">
        Find everything you need to look and feel your best, and shop the latest
        men's fashion and lifestyle products
      </div>

      {/* category */}
      <div className="flex justify-center gap-x-2 mt-10 overflow-x-auto whitespace-nowrap px-4">
        {["Tshirt", "Jacket", "Pants", "Hoodie", "Short"].map(
          (category, index) => (
            <Link
              to={`/${category.toLowerCase()}`}
              key={index}
              className={`text-sm rounded-full px-5 py-2 border-2 ${
                category === "Tshirt"
                  ? "text-white bg-black border-white"
                  : "text-black border-black"
              }`}
            >
              {category}
            </Link>
          )
        )}
        <Link
          to="/settings"
          className="border-2 rounded-full px-2 border-black"
        >
          <Settings2 className="mt-1" />
        </Link>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 container mx-auto mt-10 gap-10 p-10 md:p-0">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-lg ">
            <Link to={`/product/${card.id}`}>
              {/* Link to product details */}
              <CardHeader>
                <img
                  className="rounded-lg w-full"
                  src={card.imgSrc}
                  alt={card.title}
                />
              </CardHeader>
            </Link>
            <CardBody>
              <Link to={`/product/${card.id}`}>
                <Typography
                  variant="h5"
                  className="mb-2 font-bold tracking-tight text-gray-900"
                >
                  {card.title}
                </Typography>
              </Link>
              <Typography className="mb-3 font-normal text-gray-700">
                {card.description}
              </Typography>
              <div className="font-bold text-lg">{card.price}$</div>
            </CardBody>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
