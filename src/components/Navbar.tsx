
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-primary to-purple-700 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-white tracking-wider">
                Beast<span className="text-yellow-300">Cart</span>
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Products
            </Link>
            <Link to="/account" className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Account
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center">
            <Link to="/cart" className="relative group">
              <ShoppingCart className="h-6 w-6 text-white group-hover:text-yellow-300 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative mr-4">
              <ShoppingCart className="h-6 w-6 text-white" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            <button
              type="button"
              className="text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary/95 backdrop-blur-sm">
            <Link
              to="/"
              className="text-white hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-white hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/account"
              className="text-white hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
