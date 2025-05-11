
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedProducts from '@/components/FeaturedProducts';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { SAMPLE_PRODUCTS } from '@/data/products';

const HomePage = () => {
  const { addToCart } = useCart();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartItemCount={useCart().cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="relative h-[70vh] min-h-[500px] bg-gradient-to-r from-primary/20 to-purple-500/20 flex items-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082351050-9d351a35677f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 py-12 relative z-10">
            <div className="flex flex-col justify-center animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Welcome to <br/>
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Beast Cart</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-md text-muted-foreground">
                Unleash your shopping power with our ferocious deals on electronics, clothing, and more!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                    Shop Now <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-primary hover:bg-primary/10 transition-all duration-300">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="w-72 h-72 rounded-full bg-gradient-to-tr from-primary/30 to-purple-500/30 absolute -top-6 -left-6 animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80" 
                  alt="Shopping" 
                  className="w-80 h-96 object-cover rounded-lg shadow-2xl z-10 relative transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories section */}
        <section className="py-16 bg-background">
          <div className="container">
            <h2 className="text-3xl font-bold mb-2 text-center">Shop by Category</h2>
            <p className="text-center text-muted-foreground mb-8">Discover our collection across various categories</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
              {['Clothing', 'Electronics', 'Accessories', 'Home'].map((category) => (
                <Link 
                  key={category} 
                  to={`/products?category=${category.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-lg aspect-square shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <img 
                    src={`https://source.unsplash.com/random/300x300?${category}`}
                    alt={category}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 to-black/20 group-hover:from-black/80 group-hover:to-black/40 transition-all duration-300">
                    <h3 className="text-xl md:text-2xl font-bold text-white transform group-hover:scale-110 transition-transform duration-300">{category}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured products section */}
        <section className="py-16 bg-gradient-to-b from-muted/40 to-background">
          <div className="container">
            <FeaturedProducts products={SAMPLE_PRODUCTS.slice(0, 4)} />
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 bg-gradient-to-r from-primary to-purple-700 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_70%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_70%)]"></div>
          </div>
          <div className="container text-center relative z-10">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="max-w-lg mx-auto mb-8">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button type="submit" variant="secondary" className="shrink-0 bg-yellow-500 hover:bg-yellow-600 text-black">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
