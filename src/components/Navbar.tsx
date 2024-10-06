import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCart } from "lucide-react";
 
export function MyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );
 
  return (
    <div className="container mx-auto bg-black">
      <Navbar className="z-10 shadow-none border-b border-b-black/25 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Material Tailwind
          </Typography>
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="relative">
            <div className="absolute right-0 rounded-full w-5 h-5 bg-green-700 flex justify-center items-center">
                <p className="p-0 text-white font-bold text-[14px]">1</p>
            </div>
          <Button
            variant="text"
            size="sm"
            className="hidden lg:inline-block"
          >
            <ShoppingCart />
          </Button>
          </div>
          {/* <IconButton
            variant="text"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          > */}
            {/* {openNav ? (
            //   <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
            //   <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )} */}
          {/* </IconButton> */}
        </div>
        <Collapse open={openNav}>
          {navList}
          <Button fullWidth variant="gradient" size="sm" className="">
            <span>Get started</span>
          </Button>
        </Collapse>
      </Navbar>
    </div>
  );
}