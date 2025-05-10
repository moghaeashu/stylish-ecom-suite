
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-card overflow-hidden flex flex-col animate-fade-in">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          {product.isNew && (
            <Badge variant="default" className="bg-primary">New</Badge>
          )}
          {product.isSale && (
            <Badge variant="secondary" className="bg-destructive">Sale</Badge>
          )}
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">{product.category}</span>
          <span className="font-semibold">${product.price.toFixed(2)}</span>
        </div>
        
        <h3 className="font-medium text-lg mb-2">{product.name}</h3>
        
        {product.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
        )}
        
        <div className="mt-auto pt-4">
          <Button 
            className="w-full gap-2" 
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
