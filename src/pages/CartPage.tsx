
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  // Free shipping for orders over ₹1000
  const shippingCost = subtotal > 1000 ? 0 : 100;
  
  // GST calculation (18% in India)
  const tax = subtotal * 0.18;
  
  const total = subtotal + shippingCost + tax;
  
  const handleCheckout = () => {
    if (!user) {
      toast("Please sign in to checkout", {
        description: "You need to be signed in to complete your purchase",
        action: {
          label: "Sign In",
          onClick: () => navigate('/auth')
        }
      });
      return;
    }
    
    navigate('/checkout');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <main className="container flex-grow py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg border p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <span>₹{shippingCost.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mb-4" onClick={handleCheckout}>
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Shipping and taxes calculated at checkout. <br />
                  Free shipping available for orders over ₹1000.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products">
              <Button>
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
