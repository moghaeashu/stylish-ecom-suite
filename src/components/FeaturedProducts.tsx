
import React from 'react';
import { Product } from './ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductProps {
  product: Product;
}

const FeaturedProduct: React.FC<FeaturedProductProps> = ({ product }) => {
  return (
    <div className="relative overflow-hidden rounded-lg group">
      <div className="aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white">
        <span className="text-sm font-medium mb-1 opacity-80">{product.category}</span>
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="hidden sm:block mb-4 max-w-md opacity-90">{product.description}</p>
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <Link to={`/products/${product.id}`}>
            <Button className="text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const featuredProduct = products[0];
  const additionalProducts = products.slice(1, 4);
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <Link to="/products">
          <Button variant="ghost" className="gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      {/* Main featured product */}
      {featuredProduct && (
        <FeaturedProduct product={featuredProduct} />
      )}
      
      {/* Additional featured products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {additionalProducts.map(product => (
          <Link 
            key={product.id} 
            to={`/products/${product.id}`}
            className="product-card overflow-hidden group"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <span className="text-sm text-muted-foreground">{product.category}</span>
              <h3 className="font-medium truncate">{product.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold">${product.price.toFixed(2)}</span>
                <span className="text-sm text-primary">View details</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
