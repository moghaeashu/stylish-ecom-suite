
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Package, 
  PackageOpen,
  ShoppingCart, 
  User, 
  List, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  className?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ className }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="h-5 w-5" />,
      path: '/admin'
    },
    {
      id: 'products',
      label: 'Products',
      icon: <Package className="h-5 w-5" />,
      path: '/admin/products'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: <ShoppingCart className="h-5 w-5" />,
      path: '/admin/orders'
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: <User className="h-5 w-5" />,
      path: '/admin/customers'
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: <PackageOpen className="h-5 w-5" />,
      path: '/admin/inventory'
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: <List className="h-5 w-5" />,
      path: '/admin/categories'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      path: '/admin/settings'
    },
  ];
  
  return (
    <aside className={cn(
      "h-screen w-64 border-r flex flex-col bg-sidebar",
      className
    )}>
      <div className="p-6 border-b">
        <h1 className="text-lg font-bold">ShopVista Admin</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  activeItem === item.id 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted"
                )}
                onClick={() => setActiveItem(item.id)}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t mt-auto">
        <Link to="/">
          <Button variant="outline" className="w-full flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Exit Admin
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
