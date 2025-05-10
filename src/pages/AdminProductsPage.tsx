
import React, { useState } from 'react';
import AdminSidebar from '@/components/ui/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash, Edit, Search } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '@/data/products';
import { Product } from '@/components/ProductCard';

const AdminProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddProduct = (product: Product) => {
    setProducts([...products, { ...product, id: Math.random().toString() }]);
    setIsDialogOpen(false);
  };
  
  const handleUpdateProduct = (product: Product) => {
    setProducts(products.map(p => p.id === product.id ? product : p));
    setIsDialogOpen(false);
  };
  
  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };
  
  const openAddDialog = () => {
    setCurrentProduct(null);
    setIsDialogOpen(true);
  };
  
  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsDialogOpen(true);
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Products</h1>
            <p className="text-muted-foreground">Manage your product catalog</p>
          </div>
          
          <Button onClick={openAddDialog} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left font-medium py-3 px-4">Image</th>
                  <th className="text-left font-medium py-3 px-4">Name</th>
                  <th className="text-left font-medium py-3 px-4">Category</th>
                  <th className="text-left font-medium py-3 px-4">Price</th>
                  <th className="text-left font-medium py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="py-3 px-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 rounded-md object-cover"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {product.description}
                      </div>
                    </td>
                    <td className="py-3 px-4">{product.category}</td>
                    <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditDialog(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <ProductDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          product={currentProduct}
          onSave={currentProduct ? handleUpdateProduct : handleAddProduct}
        />
      </div>
    </div>
  );
};

interface ProductDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product: Product | null;
  onSave: (product: Product) => void;
}

const ProductDialog: React.FC<ProductDialogProps> = ({ 
  isOpen, 
  setIsOpen, 
  product, 
  onSave 
}) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      price: 0,
      description: '',
      image: '',
      category: 'Clothing',
      isNew: false,
      isSale: false
    }
  );
  
  React.useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: '',
        price: 0,
        description: '',
        image: 'https://source.unsplash.com/random/300x300?product',
        category: 'Clothing',
        isNew: false,
        isSale: false
      });
    }
  }, [product]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Product);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {product ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogDescription>
              {product ? 'Update the product details' : 'Fill in the product details'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="price" className="text-right text-sm font-medium">
                Price
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="category" className="text-right text-sm font-medium">
                Category
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Home">Home</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="image" className="text-right text-sm font-medium">
                Image URL
              </label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="description" className="text-right text-sm font-medium pt-2">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right text-sm font-medium">
                Flags
              </div>
              <div className="col-span-3 flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isNew"
                    checked={formData.isNew}
                    onChange={() => setFormData({ ...formData, isNew: !formData.isNew })}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="isNew" className="text-sm font-medium">
                    Mark as New
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isSale"
                    checked={formData.isSale}
                    onChange={() => setFormData({ ...formData, isSale: !formData.isSale })}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="isSale" className="text-sm font-medium">
                    On Sale
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {product ? 'Update Product' : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminProductsPage;
