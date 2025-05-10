
import React, { useState } from 'react';
import ProductCard, { Product } from './ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [...new Set(products.map(product => product.category))];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
              className="h-9"
            >
              {category}
            </Button>
          ))}
          
          {selectedCategory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="h-9 px-2"
            >
              <X className="h-4 w-4 mr-1" />
              Clear filter
            </Button>
          )}
        </div>
      </div>
      
      {/* Active filters */}
      {(searchQuery || selectedCategory) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Active filters:</span>
          
          {searchQuery && (
            <Badge variant="outline" className="flex items-center gap-1">
              Search: {searchQuery}
              <button onClick={() => setSearchQuery('')} className="ml-1">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {selectedCategory && (
            <Badge variant="outline" className="flex items-center gap-1">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory(null)} className="ml-1">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
      
      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart} 
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
