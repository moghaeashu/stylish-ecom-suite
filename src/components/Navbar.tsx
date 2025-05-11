
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, LogIn, User, Package, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  cartItemCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userProfile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };
  
  const getInitials = () => {
    if (userProfile?.full_name) {
      return userProfile.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'BC';
  };

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
            {user && (
              <Link to="/orders" className="text-white hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                My Orders
              </Link>
            )}
          </nav>
          
          <div className="hidden md:flex items-center space-x-5">
            <Link to="/cart" className="relative group">
              <ShoppingCart className="h-6 w-6 text-white group-hover:text-yellow-300 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors">
                    <Avatar className="h-8 w-8 border-2 border-white">
                      <AvatarFallback className="bg-primary-foreground text-primary text-sm">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="font-normal text-sm text-muted-foreground">Signed in as</div>
                    <div className="truncate">{userProfile?.full_name || user?.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/account')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    <Package className="mr-2 h-4 w-4" />
                    <span>Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link 
                to="/auth" 
                className="inline-flex items-center gap-2 text-white bg-primary-foreground/20 hover:bg-primary-foreground/30 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            )}
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
            <button
              className="text-white hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              onClick={() => handleNavigate('/')}
            >
              Home
            </button>
            <button
              className="text-white hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              onClick={() => handleNavigate('/products')}
            >
              Products
            </button>
            
            {user ? (
              <>
                <button
                  className="text-white hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  onClick={() => handleNavigate('/orders')}
                >
                  My Orders
                </button>
                <button
                  className="text-white hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  onClick={() => handleNavigate('/account')}
                >
                  Account
                </button>
                <button
                  className="text-white hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                className="text-white hover:bg-primary-foreground/10 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
                onClick={() => handleNavigate('/auth')}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
