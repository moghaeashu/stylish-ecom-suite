
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Package, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const OrderCard = ({ order }: { order: any }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Order #{order.id}</CardTitle>
          <Badge>{order.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {order.items.map((item: any) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                <p className="text-sm">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Total: <span className="font-bold text-foreground">${order.total.toFixed(2)}</span>
        </p>
        <Button variant="outline" size="sm">View Details</Button>
      </CardFooter>
    </Card>
  );
};

const AccountPage = () => {
  const { cartItems } = useCart();
  
  // Sample orders data - in a real app, this would come from an API
  const orders = [
    {
      id: '1001',
      date: 'May 5, 2025',
      status: 'Delivered',
      total: 128.50,
      items: [
        { id: '1', name: 'Wireless Headphones', quantity: 1, price: 89.99, image: 'https://source.unsplash.com/random/100x100?headphones' },
        { id: '2', name: 'Phone Case', quantity: 1, price: 19.99, image: 'https://source.unsplash.com/random/100x100?phone-case' }
      ]
    },
    {
      id: '1002',
      date: 'April 28, 2025',
      status: 'Processing',
      total: 45.80,
      items: [
        { id: '3', name: 'T-Shirt', quantity: 2, price: 22.90, image: 'https://source.unsplash.com/random/100x100?tshirt' }
      ]
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <main className="container flex-grow py-8">
        <h1 className="text-3xl font-bold mb-8">Your Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Profile Information</h3>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input id="phone" defaultValue="(123) 456-7890" />
                    </div>
                    
                    <Button className="w-full">Update Profile</Button>
                  </form>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="address" className="text-sm font-medium">
                        Street Address
                      </label>
                      <Input id="address" defaultValue="123 Main Street" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="city" className="text-sm font-medium">
                          City
                        </label>
                        <Input id="city" defaultValue="New York" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="state" className="text-sm font-medium">
                          State
                        </label>
                        <Input id="state" defaultValue="NY" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="zip" className="text-sm font-medium">
                          Zip Code
                        </label>
                        <Input id="zip" defaultValue="10001" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="country" className="text-sm font-medium">
                          Country
                        </label>
                        <Input id="country" defaultValue="United States" />
                      </div>
                    </div>
                    
                    <Button className="w-full">Update Address</Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">
                      When you place an order, it will appear here.
                    </p>
                    <Button>Start Shopping</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
