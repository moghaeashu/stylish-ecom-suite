
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Package, LayoutDashboard, Users, ShoppingCart, Settings, LogOut } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    window.location.href = '/admin/login';
  };

  const links = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      href: '/admin',
      isActive: location.pathname === '/admin',
    },
    {
      title: 'Products',
      icon: <Package size={20} />,
      href: '/admin/products',
      isActive: location.pathname === '/admin/products',
    },
    {
      title: 'Orders',
      icon: <ShoppingCart size={20} />,
      href: '/admin/orders',
      isActive: location.pathname === '/admin/orders',
    },
    {
      title: 'Customers',
      icon: <Users size={20} />,
      href: '/admin/customers',
      isActive: location.pathname === '/admin/customers',
    },
    {
      title: 'Settings',
      icon: <Settings size={20} />,
      href: '/admin/settings',
      isActive: location.pathname === '/admin/settings',
    },
  ];

  return (
    <div
      className={cn(
        'bg-sidebar border-r border-sidebar-border h-screen transition-all duration-300 ease-in-out flex flex-col',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        <Link
          to="/admin"
          className={cn(
            'flex items-center gap-2 font-semibold text-sidebar-foreground',
            isCollapsed && 'justify-center'
          )}
        >
          <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-primary/90 to-purple-600/90 flex items-center justify-center">
            <span className="text-white font-bold">BC</span>
          </div>
          {!isCollapsed && <span>Beast Cart Admin</span>}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground/60 hover:text-sidebar-foreground"
        >
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
              link.isActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                : 'text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
              isCollapsed && 'justify-center'
            )}
          >
            {link.icon}
            {!isCollapsed && <span>{link.title}</span>}
          </Link>
        ))}
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2 rounded-md text-sidebar-foreground/75 hover:bg-red-500/10 hover:text-red-500 transition-colors',
            isCollapsed && 'justify-center'
          )}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
