import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Auction {
  id: string;
  productId: string;
  startPrice: number;
  endPrice: number;
  endTime: string;
  product: {
    name: string;
    image: string;
  };
}

const Auctions: React.FC = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auction');
        setAuctions(response.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Active Auctions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <Link key={auction.id} to={`/auction/${auction.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <img src={auction.product.image} alt={auction.product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{auction.product.name}</h2>
                <p className="text-gray-600 mb-2">Starting Price: ${auction.startPrice}</p>
                <p className="text-gray-600 mb-2">End Price: ${auction.endPrice}</p>
                <p className="text-gray-600">
                  Ends: {new Date(auction.endTime).toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Auctions;
