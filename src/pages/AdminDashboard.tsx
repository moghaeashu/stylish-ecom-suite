
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, User, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import AdminSidebar from '@/components/ui/AdminSidebar';

// Sample data for charts and stats
const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 2000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
];

const AdminDashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">$12,628</p>
                  <p className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    +12.5% from last month
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">256</p>
                  <p className="flex items-center text-sm text-green-600">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    +8.2% from last month
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">New Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">42</p>
                  <p className="flex items-center text-sm text-red-600">
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                    -4.1% from last month
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sales Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You have 12 pending orders to process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium py-3 px-4">Order ID</th>
                    <th className="text-left font-medium py-3 px-4">Customer</th>
                    <th className="text-left font-medium py-3 px-4">Date</th>
                    <th className="text-left font-medium py-3 px-4">Amount</th>
                    <th className="text-left font-medium py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'ORD-001', customer: 'John Doe', date: '2025-05-10', amount: '$128.50', status: 'Processing' },
                    { id: 'ORD-002', customer: 'Jane Smith', date: '2025-05-09', amount: '$85.20', status: 'Shipped' },
                    { id: 'ORD-003', customer: 'Robert Johnson', date: '2025-05-09', amount: '$212.99', status: 'Delivered' },
                    { id: 'ORD-004', customer: 'Emily Wilson', date: '2025-05-08', amount: '$45.80', status: 'Processing' },
                    { id: 'ORD-005', customer: 'Michael Brown', date: '2025-05-08', amount: '$325.65', status: 'Pending' },
                  ].map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">{order.customer}</td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">{order.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Shipped' ? 'bg-amber-100 text-amber-800' :
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
