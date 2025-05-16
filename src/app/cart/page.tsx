'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CartItem, Product, Price, pricesAPI } from '@/lib/api';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, removeFromCart, updateQuantity, subtotal, isLoading } = useCart();
  const [prices, setPrices] = useState<Record<string, Price>>({});
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/cart');
      return;
    }

    fetchPrices();
  }, [user, router]);

  const fetchPrices = async () => {
    try {
      setIsLoadingPrices(true);
      
      // Get all product IDs from cart items
      const productIds = items.map(item => 
        typeof item.product === 'string' 
          ? item.product 
          : item.product._id
      );
      
      if (productIds.length === 0) {
        setIsLoadingPrices(false);
        return;
      }
      
      // Fetch prices for all products
      const pricesResponse = await pricesAPI.getAll();
      
      // Create a map of product ID to price
      const pricesMap: Record<string, Price> = {};
      pricesResponse.data.forEach((price: Price) => {
        pricesMap[price.product] = price;
      });
      
      setPrices(pricesMap);
    } catch (err) {
      console.error('Error fetching prices:', err);
    } finally {
      setIsLoadingPrices(false);
    }
  };

  const getProductId = (item: CartItem): string => {
    return typeof item.product === 'string' ? item.product : item.product._id;
  };

  const getProductName = (item: CartItem): string => {
    return typeof item.product === 'string'
      ? 'Loading...'
      : item.product.name || item.product.productName || 'Product';
  };

  const getItemTotal = (item: CartItem): number => {
    const productId = getProductId(item);
    const price = prices[productId];
    return price ? price.amount * item.quantity : 0;
  };

  const calculateTotal = (): number => {
    return items.reduce((total, item) => total + getItemTotal(item), 0);
  };

  const handleQuantityChange = async (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateQuantity(item._id, newQuantity);
  };

  const handleRemoveItem = async (item: CartItem) => {
    await removeFromCart(item._id);
  };

  const handleCheckout = () => {
    // In a real app, this would redirect to a checkout page
    alert('Checkout functionality would be implemented here');
  };

  if (!user) {
    return null; // We'll redirect in the useEffect
  }

  const isCartEmpty = items.length === 0;

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      
      {isLoading ? (
        <div className="text-center py-8">
          <p>Loading cart...</p>
        </div>
      ) : (
        <>
          {isCartEmpty ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-xl mb-6">Your cart is empty</p>
              <Link
                href="/products"
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    {items.map((item) => {
                      const productId = getProductId(item);
                      const price = prices[productId];
                      
                      return (
                        <li key={item._id} className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row">
                            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                              {typeof item.product !== 'string' && item.product.productImage?.url ? (
                                <div className="relative w-24 h-24">
                                  <Image
                                    src={item.product.productImage.url || '/placeholder.png'}
                                    alt={String(item.product.name || item.product.productName || 'Product image')}
                                    fill
                                    className="object-cover rounded-md"
                                  />
                                </div>
                              ) : (
                                <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                                  <span className="text-gray-400 text-sm">No image</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-grow">
                              <h3 className="text-lg font-medium">
                                <Link href={`/products/${productId}`} className="hover:text-blue-600">
                                  {getProductName(item)}
                                </Link>
                              </h3>
                              
                              {price && (
                                <p className="text-gray-600 mt-1">
                                  {price.amount} {price.currency} per {price.unit}
                                </p>
                              )}
                              
                              <div className="mt-4 flex items-center">
                                <label htmlFor={`quantity-${item._id}`} className="sr-only">
                                  Quantity
                                </label>
                                <input
                                  id={`quantity-${item._id}`}
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                  className="w-16 p-1 border rounded text-center"
                                />
                                <button
                                  onClick={() => handleRemoveItem(item)}
                                  className="ml-4 text-red-600 hover:text-red-800"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                            
                            <div className="mt-4 sm:mt-0 text-right">
                              <p className="text-lg font-medium">
                                {price ? `${getItemTotal(item)} ${price.currency}` : 'Loading...'}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{isLoadingPrices ? 'Calculating...' : `${calculateTotal().toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{isLoadingPrices ? 'Calculating...' : `${calculateTotal().toFixed(2)}`}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 