
import React, { useState } from 'react';
import { ShoppingCart, User, Home, Package, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from '@/components/ui/sheet';

interface NavbarProps {
  cartItemCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount = 0 }) => {
  const [activeTab, setActiveTab] = useState('home');

  const navLinks = [
    { id: 'home', path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { id: 'products', path: '/products', label: 'Products', icon: <Package className="h-5 w-5" /> },
    { id: 'cart', path: '/cart', label: 'Cart', icon: <ShoppingCart className="h-5 w-5" /> },
    { id: 'account', path: '/account', label: 'Account', icon: <User className="h-5 w-5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2" onClick={() => setActiveTab('home')}>
            <span className="font-bold text-xl">ShopVista</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                className={`nav-link ${activeTab === link.id ? 'nav-link-active' : 'nav-link-inactive'}`}
                onClick={() => setActiveTab(link.id)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/account">
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px] flex flex-col">
            <div className="flex justify-between items-center mb-6 px-2">
              <span className="font-bold text-lg">ShopVista</span>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <SheetClose key={link.id} asChild>
                  <Link
                    to={link.path}
                    className={`nav-link px-4 py-3 ${activeTab === link.id ? 'nav-link-active' : 'nav-link-inactive'}`}
                    onClick={() => setActiveTab(link.id)}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                    {link.id === 'cart' && cartItemCount > 0 && (
                      <Badge className="ml-auto bg-primary text-primary-foreground">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
