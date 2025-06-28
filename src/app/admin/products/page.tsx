'use client';

import { useEffect, useState } from 'react';
import { Product, Price, PriceRange, productsAPI, pricesAPI } from '@/lib/api';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

export default function AdminProductsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [prices, setPrices] = useState<Record<string, Price>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<Price | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    productDescription: '',
    currentPrice: 0,
    content: '',
    stars: 0,
  });
  const [newPrice, setNewPrice] = useState({
    product: '',
    priceRanges: [{ minBooking: 1, maxBooking: 10, price: 0 }] as PriceRange[],
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login?redirect=/admin/products');
      return;
    }
    fetchProductsAndPrices();
  }, [user, router]);

  const fetchProductsAndPrices = async () => {
    try {
      setIsLoading(true);
      
      // Fetch products
      const productsResponse = await productsAPI.getAll();
      setProducts(productsResponse.data.products);
      
      // Fetch prices
      const pricesResponse = await pricesAPI.getAll();
      const pricesMap: Record<string, Price> = {};
      pricesResponse.data.prices.forEach((price: Price) => {
        pricesMap[price.product] = price;
      });
      setPrices(pricesMap);
      
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async () => {
    if (!imageFile) {
      setError('Image is required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('productName', newProduct.productName);
      formData.append('productDescription', newProduct.productDescription);
      formData.append('currentPrice', newProduct.currentPrice.toString());
      formData.append('content', newProduct.content);
      formData.append('stars', newProduct.stars.toString());
      if (imageFile) {
        formData.append('image', imageFile);
      }
      const response = await productsAPI.create(formData);
      setProducts(prev => [...prev, response.data]);
      setNewProduct({
        productName: '',
        productDescription: '',
        currentPrice: 0,
        content: '',
        stars: 0,
      });
      setImageFile(null);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create product');
    }
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;

    try {
      const response = await productsAPI.update(selectedProduct._id, {
        productName: newProduct.productName,
        productDescription: newProduct.productDescription,
        currentPrice: newProduct.currentPrice,
        content: newProduct.content,
        stars: newProduct.stars,
      });
      setProducts(prev => prev.map(p => p._id === selectedProduct._id ? response.data : p));
      setSelectedProduct(null);
      setIsEditing(false);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update product');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await productsAPI.delete(productId);
      setProducts(prev => prev.filter(p => p._id !== productId));
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleCreatePrice = async () => {
    try {
      const response = await pricesAPI.create(newPrice);
      setPrices(prev => ({ ...prev, [response.data.price.product]: response.data.price }));
      setNewPrice({
        product: '',
        priceRanges: [{ minBooking: 1, maxBooking: 10, price: 0 }],
        isActive: true,
      });
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create price');
    }
  };

  const handleUpdatePrice = async () => {
    if (!selectedPrice) return;

    try {
      const response = await pricesAPI.update(selectedPrice._id, newPrice);
      setPrices((prev: Record<string, Price>) => ({ ...prev, [response.data.price.product]: response.data.price }));
      setSelectedPrice(null);
      setIsEditing(false);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update price');
    }
  };

  const handleDeletePrice = async (priceId: string) => {
    if (!confirm('Are you sure you want to delete this price?')) return;

    try {
      await pricesAPI.delete(priceId);
      setPrices(prev => {
        const newPrices = { ...prev };
        const price = Object.values(prev).find(p => p._id === priceId);
        if (price) {
          delete newPrices[price.product];
        }
        return newPrices;
      });
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete price');
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setNewProduct({
      productName: product.productName,
      productDescription: product.productDescription,
      currentPrice: product.currentPrice,
      content: product.content,
      stars: product.stars,
    });
    setIsEditing(true);
  };

  const handleEditPrice = (price: Price) => {
    setSelectedPrice(price);
    setNewPrice({
      product: price.product,
      priceRanges: price.priceRanges,
      isActive: price.isActive,
    });
    setIsEditing(true);
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Products Management</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Create/Edit Product Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? 'Edit Product' : 'Create New Product'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={newProduct.productName}
            onChange={e => setNewProduct({ ...newProduct, productName: e.target.value })}
            placeholder="Product Name"
            className="p-2 border rounded"
          />
          <input
            value={newProduct.productDescription}
            onChange={e => setNewProduct({ ...newProduct, productDescription: e.target.value })}
            placeholder="Description"
            className="p-2 border rounded"
          />
          <input
            type="number"
            value={newProduct.currentPrice}
            onChange={e => setNewProduct({ ...newProduct, currentPrice: Number(e.target.value) })}
            placeholder="Current Price"
            className="p-2 border rounded"
          />
          <input
            value={newProduct.content}
            onChange={e => setNewProduct({ ...newProduct, content: e.target.value })}
            placeholder="Content"
            className="p-2 border rounded"
          />
          <input
            type="number"
            value={newProduct.stars}
            onChange={e => setNewProduct({ ...newProduct, stars: Number(e.target.value) })}
            placeholder="Stars"
            min={0}
            max={5}
            className="p-2 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={e => setImageFile(e.target.files?.[0] || null)}
            className="p-2"
          />
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={isEditing ? handleUpdateProduct : handleCreateProduct}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {isEditing ? 'Update Product' : 'Create Product'}
          </button>
          {isEditing && (
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedProduct(null);
                setNewProduct({
                  productName: '',
                  productDescription: '',
                  currentPrice: 0,
                  content: '',
                  stars: 0,
                });
              }}
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Create/Edit Price Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? 'Edit Price' : 'Create New Price'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={newPrice.product}
            onChange={e => setNewPrice({ ...newPrice, product: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>
                {product.productName}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newPrice.isActive}
              onChange={e => setNewPrice({ ...newPrice, isActive: e.target.checked })}
              className="h-4 w-4"
            />
            <label>Active</label>
          </div>
          {newPrice.priceRanges.map((range, index) => (
            <div key={index} className="col-span-2 grid grid-cols-3 gap-2">
              <input
                type="number"
                value={range.minBooking}
                onChange={e => {
                  const newRanges = [...newPrice.priceRanges];
                  newRanges[index] = { ...range, minBooking: Number(e.target.value) };
                  setNewPrice({ ...newPrice, priceRanges: newRanges });
                }}
                placeholder="Min Booking"
                className="p-2 border rounded"
              />
              <input
                type="number"
                value={range.maxBooking}
                onChange={e => {
                  const newRanges = [...newPrice.priceRanges];
                  newRanges[index] = { ...range, maxBooking: Number(e.target.value) };
                  setNewPrice({ ...newPrice, priceRanges: newRanges });
                }}
                placeholder="Max Booking"
                className="p-2 border rounded"
              />
              <input
                type="number"
                value={range.price}
                onChange={e => {
                  const newRanges = [...newPrice.priceRanges];
                  newRanges[index] = { ...range, price: Number(e.target.value) };
                  setNewPrice({ ...newPrice, priceRanges: newRanges });
                }}
                placeholder="Price"
                className="p-2 border rounded"
              />
            </div>
          ))}
          <button
            onClick={() => setNewPrice({
              ...newPrice,
              priceRanges: [...newPrice.priceRanges, { minBooking: 1, maxBooking: 10, price: 0 }]
            })}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
          >
            Add Price Range
          </button>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={isEditing ? handleUpdatePrice : handleCreatePrice}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            {isEditing ? 'Update Price' : 'Create Price'}
          </button>
          {isEditing && (
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedPrice(null);
                setNewPrice({
                  product: '',
                  priceRanges: [{ minBooking: 1, maxBooking: 10, price: 0 }],
                  isActive: true,
                });
              }}
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product._id} className="border rounded p-4">
                <h3 className="font-bold">{product.productName}</h3>
                <p className="text-gray-600">{product.productDescription}</p>
                <p>Price: ${product.currentPrice}</p>
                <p>Stars: {product.stars}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Prices List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Prices</h2>
        {isLoading ? (
          <p>Loading prices...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(prices).map(price => (
              <div key={price._id} className="border rounded p-4">
                <h3 className="font-bold">
                  {products.find(p => p._id === price.product)?.productName || 'Unknown Product'}
                </h3>
                <p>Status: {price.isActive ? 'Active' : 'Inactive'}</p>
                <div className="mt-2">
                  <h4 className="font-semibold">Price Ranges:</h4>
                  {price.priceRanges.map((range, index) => (
                    <p key={index} className="text-sm">
                      {range.minBooking}-{range.maxBooking}: ${range.price}
                    </p>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEditPrice(price)}
                    className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePrice(price._id)}
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 