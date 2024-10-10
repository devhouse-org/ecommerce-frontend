
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingBasketIcon, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
type Props = {};

const Home = ({}: Props) => {
  const clothingBrands = [
    {
      title: "Dante Grey DB Luxury Coat",
      img: "https://schoffa.com/cdn/shop/files/Schoffa-103-5.jpg?v=1717066632&width=2000",
      description:
        "High-end, premium brands known for their quality craftsmanship, exclusive designs, and expensive pricing. These brands often use luxurious materials and are frequently seen on runways.",
    },
    {
      title: "Tuxedo",
      img: "https://schoffa.com/cdn/shop/files/Schoffa-103-5.jpg?v=1717066632&width=2000",
      description:
        "Urban fashion brands that cater to youth culture with bold designs, casual wear, and strong influences from hip-hop, skateboarding, and sports. These brands emphasize comfort and individuality.",
    },
    {
      title: "Wedding Suits",
      img: "https://schoffa.com/cdn/shop/files/Schoffa-103-5.jpg?v=1717066632&width=2000",
      description:
        "Eco-friendly and ethically produced brands focusing on environmentally conscious materials, fair labor practices, and reducing their carbon footprint while still delivering stylish clothing.",
    },
  ];
  return (
    <>
      <div className="h-[100vh] lg:h-[80vh] flex justify-center bg-black/95">
        <div className="header px-8 container mx-auto relative">
          <div className="absolute bottom-[-200px] left-[-400px] w-[250px] h-[250px] bg-white/50 blur-[110px] rounded-full" />
          <div className="flex  flex-col-reverse lg:flex-row h-full gap-x-4">
            <div className="content flex-1 flex flex-col justify-start lg:justify-center text-center lg:text-left">
              <h3 className="font-bold text-md text-gray-50/75 ">New Product</h3>
              <h1 className="text-4xl mb-4 mt-1 font-bold text-brown-50 text-white">
                Coton Fabric
              </h1>
              <p className="max-w-[75%] text-white/75  self-center lg:self-auto">
                Stay warm in our new, easy-care sweaters. Perfect for dressing
                up or down, while staying comfortable all season long.
              </p>
              <Link to={"/products"} className="bg-white h-fit py-2 px-4 w-fit mt-4 self-center lg:self-start rounded-md cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-md hover:before:left-0 text-[#000] font-bold">
              See Products
            </Link>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end  items-center">
              <div className="img-container h-[70%] w-full max-w-[500px] rounded-md overflow-hidden">
                <img
                  className="w-full h-full object-cover hover:scale-[1.11] duration-[.9s] transition ease-in-out"
                  src="https://cdn.shopify.com/s/files/1/1368/3463/files/Stachehaus_E2_84_A2_Cuts_Fall24_LA-321_450x_crop_center@2x.progressive.jpg?v=1726606783"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 my-20">
        <div className="flex justify-center">
          <h3 className="font-bold text-[24px] text-gray-800 mb-4">Best Sellers</h3>
        </div>
        <div className="best_sellers_categories flex gap-y-4 flex-wrap justify-between gap-x-4">
          {clothingBrands.map((item) => (
            <div className="flex-1 card m-auto text-gray-300 w-[clamp(260px,80%,300px)] hover:brightness-90 transition-all cursor-pointer group bg-gradient-to-tl from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950 border-r-2 border-t-2 border-gray-900 rounded-lg relative">
            <div className="px-8 my-4 ">
              <div className="bg-orange-600 overflow-hidden relative w-16 h-16 rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-green-900 transition-all">
              <div className="rounded-full p-[2px]"><img className="w-full h-full rounded-full object-cover" src={item.img} alt="" /></div>

              </div>
              <div className="uppercase font-bold text-xl truncate pb-2">
               {item.title} 
              </div>
              <div className="text-gray-300 truncate  uppercase tracking-widest">
               {item.description} 
              </div>
            </div>
            
      
            <div className="h-2 w-full bg-gradient-to-l via-green-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0"></div>
            <div className="h-0.5 group-hover:w-full bg-gradient-to-l  via-yellow-950 group-hover:via-green-500 w-[70%] m-auto rounded transition-all"></div>
          </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-8">
        {/* ZX7 Speaker */}
        <div className="h-[400px] mb-4 w-full rounded-md overflow-hidden">
          <img
            src="https://cdn.shopify.com/s/files/1/1368/3463/files/Artboard_201_20copy_205_13d61b79-809d-40bf-ac72-22cc43767843_1440x_crop_center@2x.progressive.jpg?v=1726528926"// Replace with actual image source
            className="w-full h-full object-cover hover:scale-[1.11] duration-[.9s] transition ease-in-out"
          />
        </div>

        {/* YX1 Earphones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-md overflow-hidden max-h-[600px]">
            <img
              src="https://cdn.shopify.com/s/files/1/1368/3463/files/hp-mens-tops-4-tile_450x_crop_center@2x.progressive.jpg?v=1717692158" // Replace with actual image source
              alt="YX1 Earphones"
              className="w-full h-full object-cover hover:scale-[1.11] duration-[.9s] transition ease-in-out"
            />
          </div>
          <div className="rounded-md overflow-hidden max-h-[600px]">
            <img
              src="https://cdn.shopify.com/s/files/1/1368/3463/files/AOSeries_Homepage_4-Block_3x4_Shorts_26Pants_450x_crop_center@2x.progressive.webp?v=1710159897" // Replace with actual image source
              alt="YX1 Earphones"
              className="w-full h-full object-cover hover:scale-[1.11] duration-[.9s] transition ease-in-out"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
