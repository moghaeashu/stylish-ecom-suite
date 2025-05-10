
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { useCart } from '@/context/CartContext';
import { SAMPLE_PRODUCTS } from '@/data/products';

const ProductsPage = () => {
  const { addToCart, cartItems } = useCart();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <main className="container flex-grow py-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        <ProductGrid 
          products={SAMPLE_PRODUCTS} 
          onAddToCart={addToCart} 
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
