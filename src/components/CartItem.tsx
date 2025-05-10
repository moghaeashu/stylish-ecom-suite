
import React from 'react';
import { Product } from './ProductCard';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Minus } from 'lucide-react';

export interface CartItemType {
  product: Product;
  quantity: number;
}

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, updateQuantity, removeFromCart }) => {
  const { product, quantity } = item;
  
  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };
  
  const subtotal = product.price * quantity;
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 py-4 border-b">
      <div className="flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-24 h-24 object-cover rounded-md"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row flex-grow gap-4 justify-between">
        <div className="flex-grow">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <p className="text-sm font-medium mt-1">${product.price.toFixed(2)}</p>
        </div>
        
        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-4">
          <div className="flex items-center border rounded-md">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <div className="w-8 text-center">{quantity}</div>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
              onClick={handleIncrement}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <p className="font-medium">${subtotal.toFixed(2)}</p>
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => removeFromCart(product.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
