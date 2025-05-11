
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const OrdersPage = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user) return;
        
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(count)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);
  
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.payment_method?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusBadgeColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'processing': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'shipped': return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'delivered': return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'cancelled': return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'completed': return 'bg-green-100 text-green-800 hover:bg-green-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };
  
  const getPaymentMethodDisplay = (method: string) => {
    switch (method?.toLowerCase()) {
      case 'upi': return 'UPI Payment';
      case 'cod': return 'Cash on Delivery';
      case 'card': return 'Card Payment';
      default: return method;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <main className="container flex-grow py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        <div className="bg-white rounded-lg border mb-8">
          <div className="p-4 border-b">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <h2 className="text-xl font-semibold">Order History</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  className="pl-9 w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="p-12 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
              <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
              <Link to="/products">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        #{order.id.substring(0, 8)}
                      </TableCell>
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {order.order_items[0]?.count || 0}
                      </TableCell>
                      <TableCell>
                        ₹{order.total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadgeColor(order.status)}>
                          {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Processing'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getPaymentMethodDisplay(order.payment_method)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to={`/order-success/${order.id}`}>
                          <Button size="sm" variant="outline" className="gap-1">
                            Details
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrdersPage;
