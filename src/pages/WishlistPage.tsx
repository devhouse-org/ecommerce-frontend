import { Link } from "react-router-dom";
import { useWishlistStore, useCartStore } from "../store/index";
import { ShoppingCart, Trash2 } from "lucide-react";
import { CartItem } from "@/utils/types";



const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  return (
    <div className="container mx-auto px-4 pt-28">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product: CartItem) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </Link>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                <p className="font-bold text-lg text-green-600">${product.price.toFixed(2)}</p>
              </div>
              <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
                <button
                  onClick={() => addToCart(product, 1)}
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 transition-colors duration-300"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-300"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
