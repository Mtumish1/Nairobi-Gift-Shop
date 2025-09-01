import React, { useState, useEffect } from 'react';
import { getOrderHistory } from '../services/api';
import { useUser } from '../contexts/UserContext';

interface Order {
  id: number;
  total_amount: number;
  status: string;
  created_at: string;
}

export const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrderHistory = async () => {
        try {
          const data = await getOrderHistory();
          setOrders(data);
        } catch (err) {
          setError('Failed to fetch order history.');
        } finally {
          setLoading(false);
        }
      };
      fetchOrderHistory();
    } else {
      setLoading(false);
      setError('You must be logged in to view your order history.');
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading order history...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no past orders.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order.id} className="p-4 border rounded-lg">
              <div>Order ID: {order.id}</div>
              <div>Date: {new Date(order.created_at).toLocaleDateString()}</div>
              <div>Total: KSh {order.total_amount.toLocaleString()}</div>
              <div>Status: {order.status}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
