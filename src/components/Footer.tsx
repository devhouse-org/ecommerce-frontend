import { Facebook, Instagram, Twitter, Github, Youtube } from 'lucide-react'; // Importing Lucide icons
import { Link } from "react-router-dom";

import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";
import { RiTwitterXLine } from "react-icons/ri";

 
export function MyFooter() {
  return (
    <footer className="w-full border-t border-blue-gray-50 mt-8 p-8">
      <div className="container mx-auto px-8 flex flex-col md:flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
        
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Link
              to="/"
              className="text-gray-600 transition-colors hover:text-gray-600/75 focus:text-gray-600/75 font-bold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="text-gray-600 transition-colors hover:text-gray-600/75 focus:text-gray-600/75 font-bold"
            >
              Products
            </Link>
          </li>
<li>
            <Link
              to="/contact"
              className="text-gray-600 transition-colors hover:text-gray-600/75 focus:text-gray-600/75 font-bold"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-600 transition-colors hover:text-gray-600/75 focus:text-gray-600/75 font-bold"
            >
              About Us
            </Link>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex space-x-6 justify-center mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600/75 transition ease-in-out hover:text-gray-600"
          >
            <SlSocialFacebook className="h-5 w-5" />
            {/* <Facebook className="h-6 w-6" /> */}
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600/75 transition ease-in-out hover:text-gray-600"
          >
            <SlSocialInstagram className="h-5 w-5"  />
            {/* <Instagram className="h-6 w-6" /> */}
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600/75 transition ease-in-out hover:text-gray-600"
          >
            <RiTwitterXLine className="h-5 w-5"  />
            {/* <Twitter className="h-6 w-6" /> */}
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <p className="mt-4 bg-white text-center text-gray-600 font-normal">
        &copy; 2024 MyApp
      </p>
    </footer>
    // <footer className="w-full border-t bg-white border-blue-gray-50  mt-8 p-8">
    //   <div className="flex  container mx-auto flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
    //     <h1 className="text-[32px] font-bold uppercase text-gray-700">E-commerce</h1>
    //     {/* <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="logo-ct" className="w-10" /> */}
    //     <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
    //       <li>
    //         <Link
    //           to="/"
    //           className="text-gray-600 transition-colors hover:text-green-600 focus:text-green-600 font-bold"
    //         >
    //          Home 
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to="/products"
    //           className="text-gray-600 transition-colors hover:text-green-600 focus:text-green-600 font-bold"
    //         >
    //          Products 
    //         </Link>
    //       </li>
    //       <li>
    //         <Link
    //           to="#"
    //           className="text-gray-600 transition-colors hover:text-green-600 focus:text-green-600 font-bold"
    //         >
    //           About Us
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>
    //   <p color="blue-gray" className="mt-4 text-center font-normal">
    //     &copy; 2024 E-COMMERCE 
    //   </p>
    // </footer>
  );
}