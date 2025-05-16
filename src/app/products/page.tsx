'use client';

import { useEffect, useState } from 'react';
import { Product, Price, productsAPI, pricesAPI } from '@/lib/api';
import ProductCard from '@/components/products/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [prices, setPrices] = useState<Record<string, Price>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [apiResponse, setApiResponse] = useState<any>(null);

  useEffect(() => {
    fetchProductsAndPrices();
  }, []);

  const fetchProductsAndPrices = async () => {
    try {
      setIsLoading(true);
      
      // Fetch products
      const productsResponse = await productsAPI.getAll();
      console.log('Products response:', productsResponse);
      setApiResponse(productsResponse);
      const productsArr = productsResponse.data.products.map((p: any) => ({
        ...p,
        name: p.name || p.productName,
        description: p.description || p.productDescription,
        category: p.category || p.content || '',
      }));
      setProducts(productsArr);
      
      // Fetch all prices
      try {
        const pricesResponse = await pricesAPI.getAll();
        console.log('Prices response:', pricesResponse);
        
        // Create a map of product ID to price
        const pricesMap: Record<string, Price> = {};
        pricesResponse.data.forEach((price: Price) => {
          pricesMap[price.product] = price;
        });
        
        setPrices(pricesMap);
      } catch (priceErr: any) {
        console.error('Error fetching prices:', priceErr);
        setError('Products loaded but pricing information could not be retrieved.');
      }
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(
        `Failed to fetch products: ${err.response?.data?.message || err.message || 'Unknown error'}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      searchTerm === '' || 
      (product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (product.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      
    const matchesCategory = 
      categoryFilter === '' || 
      product.category === categoryFilter;
      
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Shop Products</h1>
          <p className="text-lg max-w-2xl">Discover high-quality products at great prices. Join with others to unlock even better deals when you shop in bulk.</p>
        </div>
      </section>
      
      <div className="container mx-auto px-6 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
            {apiResponse && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm">Debug Info</summary>
                <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </details>
            )}
            <button 
              onClick={fetchProductsAndPrices}
              className="mt-2 bg-red-600 text-white py-1 px-3 rounded text-sm hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}
        
        {/* Search and filter */}
        <div className="mb-8 rounded-lg bg-gray-50 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Products
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  id="search"
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="md:w-1/4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Category
              </label>
              <select
                id="category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="mt-4 text-gray-600">No products found. Try adjusting your filters.</p>
              </div>
            ) : (
              <>
                <p className="mb-6 text-gray-600">{filteredProducts.length} products found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      price={prices[product._id]}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
} 