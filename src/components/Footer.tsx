import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
export function MyFooter() {
  return (
    <footer className="w-full border-t bg-white border-blue-gray-50  mt-8 p-8">
      <div className="flex  container mx-auto flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
        <h1 className="text-[32px] font-bold uppercase text-gray-700">E-commerce</h1>
        {/* <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="logo-ct" className="w-10" /> */}
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Link
              to="/"
              className="text-gray-600 transition-colors hover:text-green-600 focus:text-green-600 font-bold"
            >
             Home 
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="text-gray-600 transition-colors hover:text-green-600 focus:text-green-600 font-bold"
            >
             Products 
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="text-gray-600 transition-colors hover:text-green-600 focus:text-green-600 font-bold"
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>
      <Typography color="blue-gray" className="mt-4 text-center font-normal">
        &copy; 2024 E-COMMERCE 
      </Typography>
    </footer>
  );
}