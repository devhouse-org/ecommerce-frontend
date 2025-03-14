import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import axiosInstance from '@/utils/axiosInstance';
import { Loader2, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderItem {
    id: string;
    quantity: number;
    price: number;
    product: {
        id: string;
        name: string;
        image: string;
    };
}

interface Order {
    id: string;
    total: number;
    status: string;
    createdAt: string;
    orderItems: OrderItem[];
}

const OrdersPage: React.FC = () => {
    const userId = localStorage.getItem('userId');

    const { data: orders, isPending, isError } = useQuery<Order[]>(
        {
            queryKey: ['orders', userId],
            queryFn: async () => {
                const response = await axiosInstance.get(`/order/user/${userId}`);
                return response.data;
            },
            enabled: !!userId,
        }
    );
    if (isPending) return (
        <div className="text-center py-4 flex justify-center items-center">
            <Loader2 className="w-4 h-4 animate-spin" />
        </div>
    );
    if (isError) return <div className="text-center py-4 ">
        {"Error fetching orders"}
    </div>;

    return (
        <div className="container mx-auto  px-4 py-20">
            <h1 className="text-3xl font-bold mb-6">My Orders</h1>
            {
                orders?.length === 0 ? (
                    <div className="flex items-center flex-col justify-center gap-4 py-4 ">
                        <p className='text-lg '>No orders found</p>
                        <Link to="/products" className="flex w-fit items-center gap-2 bg-green-500 text-white  px-4 py-2 rounded-md hover:bg-green-600">
                           <ShoppingCart size={18} />
                           <span>Shop Now</span>
                        </Link>
                    </div>
                ) : 
                (
                    <div className="space-y-6">
                        {orders?.map((order) => (
                            <Card key={order.id}>
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">
                                        <span>Order #{order.id.slice(0, 8)}</span>
                                        <span className="text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Badge
                                        variant={
                                            order.status.toLowerCase() === 'pending' ? 'warning' :
                                                order.status.toLowerCase() === 'processing' ? 'secondary' :
                                                    order.status.toLowerCase() === 'shipped' ? 'info' :
                                                        order.status.toLowerCase() === 'delivered' ? 'success' :
                                                            'destructive'
                                        }
                                        className="mb-4"
                                    >
                                        {order.status}
                                    </Badge>
                                    <div className="space-y-4">
                                        {order.orderItems.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-4">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-semibold">{item.product.name}</p>
                                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                                    <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="text-right font-bold">
                                        Total: ${order.total.toFixed(2)}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default OrdersPage;
