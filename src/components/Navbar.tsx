import React from "react";

import { ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function MyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li
        className="p-1 text-gray-100 font-bold"
      >
        <Link to="/" className="flex items-center">
          Home
        </Link>
      </li>
      <li
        className="p-1 text-gray-100 font-bold"
      >
        <Link to="/products" className="flex items-center">
          Products
        </Link>
      </li>
      <li
        className="p-1 text-gray-100 font-bold"
      >
        <Link to="/about" className="flex items-center">
          About
        </Link>
      </li>
    </ul>
  );

  return (
    <div className="bg-black w-full flex justify-center">
      <nav className="fixed bg-black/85 mx-2 z-10 shadow-sm rounded-none lg:rounded-b-md w-full border-none">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link
            to="/"
            className="mr-4 uppercase font-semibold text-white cursor-pointer py-1.5"
          >
            E-commerce
          </Link>
          <div className="mr-4 hidden lg:block">{navList}</div>

          <Link to={"/checkout"} className="relative hidden lg:flex">
            <div className="absolute hidden lg:flex right-0 rounded-full w-5 h-5 bg-green-700 justify-center items-center">
              <p className="p-0 text-white font-bold text-[14px]">1</p>
            </div>
            <Button size="sm" className="hidden lg:inline-block">
              <ShoppingCart color="white" />
            </Button>
          </Link>

          {/*  */}

          <Link to={"/checkout"} className="flex lg:hidden">
            <div className="relative flex lg:hidden">
              <div className="absolute flex lg:hidden right-0 rounded-full w-5 h-5 bg-green-700 justify-center items-center">
                <p className="p-0 text-white font-bold text-[14px]">1</p>
              </div>
              <Button
                size="sm"
                className="text-gray-100 inline-block lg:hidden"
              >
                <ShoppingCart />
              </Button>
            </div>
            <Button
              className="lg:hidden"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <X className="text-gray-100" />
              ) : (
                <Menu className="text-gray-100" />
              )}
            </Button>
          </Link>
        </div>
        {/* <Collapse open={openNav}>{navList}</Collapse> */}
      </nav>
    </div>
  );
}
