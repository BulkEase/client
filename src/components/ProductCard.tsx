import Image from 'next/image';
import { useState } from 'react';
import { Price, Product } from '@/lib/api';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  product: Product;
  price?: Price;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isLoading } = useCart();

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, quantity);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48">
        {product.productImage?.url ? (
          <Image
            src={product.productImage.url}
            alt={product.productName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div 
          onClick={onClick}
          className="cursor-pointer"
        >
          <h3 className="text-lg font-semibold text-gray-800 hover:text-green-700 transition">
            {product.productName}
          </h3>
        </div>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.productDescription}
        </p>
        
        <div className="mt-3 font-semibold text-green-700">
          ₹{product.currentPrice}
        </div>
        
        <div className="mt-4 flex items-center">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-16 mr-2 p-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="bg-green-700 text-white py-1 px-3 rounded hover:bg-green-800 transition flex-grow"
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
} 