import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import axiosInstance from '@/utils/axiosInstance';

interface Auction {
  id: string;
  productId: string;
  startPrice: number;
  endPrice: number;
  endTime: string;
  product: {
    name: string;
    image: string;
    description: string;
  };
  subscribers: {
    id: string;
    price: number;
    userId: string;
  }[];
}

const AuctionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response = await axiosInstance.get(`/auction/${id}`);
        setAuction(response.data);
        if (response.data.subscribers.length > 0) {
          setBidAmount(response.data.subscribers[response.data.subscribers.length - 1].price + 1);
        } else {
          setBidAmount(response.data.startPrice);
        }
      } catch (error) {
        console.error('Error fetching auction details:', error);
      }
    };

    fetchAuctionDetails();
  }, [id]);

  const handleBid = async () => {
    // if (!isAuthenticated) {
    //   setError('You must be logged in to place a bid.');
    //   return;
    // }

    try {
      await axiosInstance.post(`/auction/${id}/subscribe`, {
        userId: userId,
        price: bidAmount,
      });
      // Refresh auction details after successful bid
      const response = await axiosInstance.get(`/auction/${id}`);
      setAuction(response.data);
      setError(null);
    } catch (error) {
      console.error('Error placing bid:', error);
      setError('Failed to place bid. Please try again.');
    }
  };

  const handleIncreaseBid = (amount: number) => {
    setBidAmount((prevAmount) => prevAmount + amount);
  };

  if (!auction) {
    return <div>Loading...</div>;
  }

  const lastBid = auction.subscribers[auction.subscribers.length - 1]?.price || auction.startPrice;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={auction.product.image} alt={auction.product.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{auction.product.name}</h1>
          <p className="text-gray-600 mb-4">{auction.product.description}</p>
          <p className="text-xl font-semibold mb-2">Current Bid: ${lastBid}</p>
          <p className="text-gray-600 mb-2">Start Price: ${auction.startPrice}</p>
          <p className="text-gray-600 mb-2">End Price: ${auction.endPrice}</p>
          <p className="text-gray-600 mb-4">Ends: {new Date(auction.endTime).toLocaleString()}</p>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className='bg-blue-500 text-white'>Place Bid</Button>
            </DialogTrigger>
            <DialogContent className='bg-white'>
              <DialogHeader>
                <DialogTitle>Place Your Bid</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(Number(e.target.value))}
                  min={lastBid + 1}
                  step="0.01"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {[10, 20, 30, 50, 100].map((amount) => (
                    <Button
                      key={amount}
                      className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                      onClick={() => handleIncreaseBid(amount)}
                    >
                      +${amount}
                    </Button>
                  ))}
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
              <Button className='bg-blue-500 text-white' onClick={handleBid}>Confirm Bid</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetails;
