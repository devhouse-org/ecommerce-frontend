import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import axiosInstance from '@/utils/axiosInstance';
import { Clock, DollarSign, Tag } from 'lucide-react';

interface Auction {
  id: string;
  productId: string;
  startPrice: number;
  endPrice: number;
  endTime: string;
  minPointsToSubscribe: number;
  product: {
    name: string;
    image: string;
    description: string;
  };
  subscribers: {
    id: string;
    price: number;
    user: {
      id: string;
      name: string;
      image: string;
    };
  }[];
}

const AuctionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [canSubscribe, setCanSubscribe] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const userId = localStorage.getItem('userId');
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [hasSubscribed, setHasSubscribed] = useState<boolean>(false);

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

        // Check if user can subscribe
        if (userId) {
          const canSubscribeResponse = await axiosInstance.get(`/auction/${id}/can-subscribe/${userId}`);
          setCanSubscribe(canSubscribeResponse.data);

          // Check if user is already subscribed
          const isSubscribed = response.data.subscribers.some((sub: any) => sub.userId === userId);
          setIsSubscribed(isSubscribed);
        }
      } catch (error) {
        console.error('Error fetching auction details:', error);
      }
    };

    fetchAuctionDetails();
  }, [id, userId]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (auction) {
        const now = new Date().getTime();
        const endTime = new Date(auction.endTime).getTime();
        const difference = endTime - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft('Auction ended');
          clearInterval(timer);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [auction]);

  const handleBid = async () => {
    if (bidAmount > auction!.endPrice) {
      setError('Bid amount cannot exceed the end price.');
      return;
    }

    try {
      await axiosInstance.post(`/auction/${id}/subscribe`, {
        userId: userId,
        price: bidAmount,
      });
      // Refresh auction details after successful bid
      const response = await axiosInstance.get(`/auction/${id}`);
      setAuction(response.data);
      setHasSubscribed(true);
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

  const lastBid = auction.subscribers[0];
  const currentBidAmount = lastBid?.price || auction.startPrice;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={auction.product.image} alt={auction.product.name} className="w-full h-80 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{auction.product.name}</h1>
          <p className="text-gray-600 mb-6">{auction.product.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-600 mb-2">
                <DollarSign size={20} />
                <span className="font-semibold">Current Bid</span>
              </div>
              <p className="text-2xl font-bold text-blue-700">${currentBidAmount.toFixed(2)}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-green-600 mb-2">
                <Clock size={20} />
                <span className="font-semibold">Time Left</span>
              </div>
              <p className="text-2xl font-bold text-green-700">{timeLeft}</p>
            </div>
          </div>
          
          {lastBid && lastBid.user && (
            <div className="flex items-center space-x-3 mb-4 bg-gray-50 p-3 rounded-lg">
              <Avatar>
                <AvatarImage src={lastBid.user.image} alt={lastBid.user.name} />
                <AvatarFallback>{lastBid.user.name ? lastBid.user.name.slice(0, 2).toUpperCase() : 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-gray-500">Highest Bidder</p>
                <p className="font-semibold">{lastBid.user.name || 'Anonymous'}</p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Tag size={16} className="text-gray-400" />
              <p className="text-gray-600">Start Price: ${auction.startPrice}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Tag size={16} className="text-gray-400" />
              <p className="text-gray-600">End Price: ${auction.endPrice}</p>
            </div>
          </div>
          
          {canSubscribe ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300">
                  Place Bid
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Place Your Bid</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  {!hasSubscribed && (
                    <p className="text-sm text-gray-600 mb-2">
                      Your first bid will deduct {auction.minPointsToSubscribe} points to join the auction.
                    </p>
                  )}
                  <Input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    min={currentBidAmount + 1}
                    max={auction.endPrice}
                    step="0.01"
                    className="mb-3"
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
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition duration-300" 
                  onClick={handleBid}
                >
                  Confirm Bid
                </Button>
              </DialogContent>
            </Dialog>
          ) : (
            <Button 
              className="w-full px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-300"
              onClick={() => window.location.href = '/buy-points'}
            >
              Buy Points to Join Auction
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuctionDetails;
