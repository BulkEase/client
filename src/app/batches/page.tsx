'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Batch, Product, batchesAPI, productsAPI } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

export default function BatchesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [batches, setBatches] = useState<Batch[]>([]);
  const [products, setProducts] = useState<Record<string, Product>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBatchName, setNewBatchName] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/batches');
      return;
    }

    fetchBatchesAndProducts();
  }, [user, router]);

  const fetchBatchesAndProducts = async () => {
    try {
      setIsLoading(true);
      
      // Fetch all batches
      const batchesResponse = await batchesAPI.getAll();
      setBatches(batchesResponse.data);
      
      // Fetch all products
      const productsResponse = await productsAPI.getAll();
      
      // Create a map of product ID to product
      const productsMap: Record<string, Product> = {};
      productsResponse.data.forEach((product: Product) => {
        productsMap[product._id] = product;
      });
      
      setProducts(productsMap);
      setAvailableProducts(productsResponse.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch batches');
      console.error('Error fetching batches:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBatchName || selectedProducts.length === 0) {
      setError('Please provide a name and select at least one product');
      return;
    }
    
    try {
      setIsLoading(true);
      await batchesAPI.create({
        name: newBatchName,
        products: selectedProducts
      });
      
      // Reset form
      setNewBatchName('');
      setSelectedProducts([]);
      setShowCreateForm(false);
      
      // Refresh batches
      await fetchBatchesAndProducts();
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create batch');
      console.error('Error creating batch:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBatch = async (batchId: string) => {
    if (!confirm('Are you sure you want to delete this batch?')) {
      return;
    }
    
    try {
      setIsLoading(true);
      await batchesAPI.delete(batchId);
      
      // Refresh batches
      await fetchBatchesAndProducts();
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete batch');
      console.error('Error deleting batch:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleProductSelection = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  if (!user) {
    return null; // We'll redirect in the useEffect
  }

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Batches</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {showCreateForm ? 'Cancel' : 'Create New Batch'}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Create New Batch</h2>
          <form onSubmit={handleCreateBatch}>
            <div className="mb-4">
              <label htmlFor="batchName" className="block mb-1">
                Batch Name
              </label>
              <input
                id="batchName"
                type="text"
                value={newBatchName}
                onChange={(e) => setNewBatchName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1">Select Products</label>
              <div className="max-h-60 overflow-y-auto border rounded p-2">
                {availableProducts.map(product => (
                  <div key={product._id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`product-${product._id}`}
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => toggleProductSelection(product._id)}
                      className="mr-2"
                    />
                    <label htmlFor={`product-${product._id}`}>
                      {product.name}
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Selected: {selectedProducts.length} products
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
              {isLoading ? 'Creating...' : 'Create Batch'}
            </button>
          </form>
        </div>
      )}
      
      {isLoading && !showCreateForm ? (
        <div className="text-center py-8">
          <p>Loading batches...</p>
        </div>
      ) : (
        <>
          {batches.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-xl mb-4">No batches found</p>
              <p className="mb-6">Create your first batch to get started</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Create Batch
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batches.map(batch => (
                <div key={batch._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">
                      <Link href={`/batches/${batch._id}`} className="hover:text-blue-600">
                        {batch.name}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 mb-4">
                      {batch.products.length} Products
                    </p>
                    
                    <h3 className="font-medium mb-2">Products in this batch:</h3>
                    <ul className="list-disc pl-5 mb-6 max-h-40 overflow-y-auto">
                      {batch.products.map(productId => {
                        const product = products[typeof productId === 'string' ? productId : productId._id];
                        return (
                          <li key={typeof productId === 'string' ? productId : productId._id}>
                            {product ? product.name : 'Loading...'}
                          </li>
                        );
                      })}
                    </ul>
                    
                    <div className="flex space-x-2">
                      <Link
                        href={`/batches/${batch._id}`}
                        className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition flex-grow text-center"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleDeleteBatch(batch._id)}
                        className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
} 