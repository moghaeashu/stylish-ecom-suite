
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Package, User, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const profileSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
});

const AccountPage = () => {
  const { cartItems } = useCart();
  const { user, userProfile, signOut, updateProfile } = useAuth();
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const navigate = useNavigate();
  
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: userProfile?.full_name || "",
      phone: userProfile?.phone || "",
      address: userProfile?.address || "",
      city: userProfile?.city || "",
      state: userProfile?.state || "",
      postalCode: userProfile?.postal_code || "",
    },
  });
  
  // Update form when profile data changes
  useEffect(() => {
    if (userProfile) {
      profileForm.reset({
        fullName: userProfile.full_name || "",
        phone: userProfile.phone || "",
        address: userProfile.address || "",
        city: userProfile.city || "",
        state: userProfile.state || "",
        postalCode: userProfile.postal_code || "",
      });
    }
  }, [userProfile, profileForm]);
  
  // Fetch recent orders
  useEffect(() => {
    const fetchRecentOrders = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*, products(*))')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(2);
        
        if (error) throw error;
        setRecentOrders(data || []);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    };
    
    fetchRecentOrders();
  }, [user]);
  
  const onProfileSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      await updateProfile({
        full_name: values.fullName,
        phone: values.phone,
        address: values.address,
        city: values.city,
        state: values.state,
        postal_code: values.postalCode,
      });
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };
  
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };
  
  const getStatusBadge = (status: string) => {
    const statusColorMap: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    
    return (
      <Badge className={statusColorMap[status?.toLowerCase()] || "bg-gray-100 text-gray-800"} variant="outline">
        {status?.charAt(0).toUpperCase() + status?.slice(1) || "Processing"}
      </Badge>
    );
  };
  
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
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                    <FormField
                      control={profileForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Your address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={profileForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Your city" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="Your state" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={profileForm.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Your postal code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-2">
                      <Button type="submit" className="w-full">
                        Update Profile
                      </Button>
                    </div>
                  </form>
                </Form>
                
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full gap-2 text-red-600 hover:text-red-700" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentOrders.length > 0 ? (
                  <div className="space-y-6">
                    {recentOrders.map(order => (
                      <Card key={order.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/50 py-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-sm text-muted-foreground">Order #{order.id.substring(0, 8)}</p>
                              <p className="text-sm font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">₹{order.total.toFixed(2)}</p>
                              {getStatusBadge(order.status)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {order.order_items?.map((item: any) => (
                              <div key={item.id} className="flex gap-4">
                                <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                                  <img 
                                    src={item.products?.image_url || "https://source.unsplash.com/random/100x100?product"} 
                                    alt={item.products?.name || "Product"} 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                                <div>
                                  <p className="font-medium">{item.products?.name || "Product"}</p>
                                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                  <p className="text-sm">₹{item.price.toFixed(2)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="bg-muted/30 py-3 flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/order-success/${order.id}`)}
                          >
                            View Order Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">
                      When you place an order, it will appear here.
                    </p>
                    <Button onClick={() => navigate('/products')}>Start Shopping</Button>
                  </div>
                )}
              </CardContent>
              {recentOrders.length > 0 && (
                <CardFooter className="flex justify-center border-t pt-4">
                  <Button variant="outline" onClick={() => navigate('/orders')}>
                    View All Orders
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
