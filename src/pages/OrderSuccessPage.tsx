
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';

const OrderSuccessPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { cartItems } = useCart();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*, products(*))')
          .eq('id', orderId)
          .single();
        
        if (error) throw error;
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
        <div className="container flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <main className="container flex-grow py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg border p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Your order has been placed successfully. We'll send you shipping confirmation once your order ships.
            </p>
            
            <div className="bg-muted/40 rounded-lg p-4 mb-6">
              <h2 className="font-semibold mb-2">Order #{orderDetails?.id.substring(0, 8)}</h2>
              <p className="text-sm">
                Placed on {new Date(orderDetails?.created_at).toLocaleDateString()} at {new Date(orderDetails?.created_at).toLocaleTimeString()}
              </p>
            </div>
            
            {orderDetails?.order_items && orderDetails.order_items.length > 0 && (
              <div className="border rounded-lg mb-6 overflow-hidden">
                <div className="bg-muted p-4 text-left font-medium">
                  Order Summary
                </div>
                <div className="p-4">
                  {orderDetails.order_items.map((item: any) => (
                    <div key={item.id} className="flex items-center py-3 border-b last:border-0">
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-4">
                        <img src={item.products.image_url} alt={item.products.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-left">{item.products.name}</h3>
                        <p className="text-sm text-gray-500 text-left">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 p-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">₹{orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-muted/40 rounded-lg p-4 mb-6 text-left">
              <h2 className="font-semibold mb-2">Shipping Address</h2>
              <p className="text-sm">{orderDetails?.shipping_address}</p>
            </div>
            
            <div className="bg-muted/40 rounded-lg p-4 mb-6 text-left">
              <h2 className="font-semibold mb-2">Payment Information</h2>
              <p className="text-sm">Method: {orderDetails?.payment_method === 'cod' ? 'Cash on Delivery' : 
                orderDetails?.payment_method === 'upi' ? 'UPI Payment' : 'Card Payment'}</p>
              <p className="text-sm">Status: <span className={`font-medium ${
                orderDetails?.payment_status === 'completed' ? 'text-green-600' : 
                orderDetails?.payment_status === 'pending' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {orderDetails?.payment_status.charAt(0).toUpperCase() + orderDetails?.payment_status.slice(1)}
              </span></p>
              {orderDetails?.upi_transaction_id && (
                <p className="text-sm">Transaction ID: {orderDetails.upi_transaction_id}</p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/orders">
                <Button variant="outline" className="gap-2">
                  <Package className="h-4 w-4" />
                  View Orders
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" className="gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
              <Link to="/">
                <Button className="gap-2">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;
