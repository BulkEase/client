"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product, Price, productsAPI, pricesAPI } from "@/lib/api";
import { useCart } from "@/lib/cart-context";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params;
  const router = useRouter();
  const { addToCart, isLoading: isCartLoading } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [price, setPrice] = useState<Price | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchProductAndPrice(id);
    }
  }, [id]);

  const fetchProductAndPrice = async (productId: string) => {
    try {
      setIsLoading(true);

      // Fetch product details
      console.log(`Fetching product with ID: ${productId}`);
      const productResponse = await productsAPI.getById(productId);
      console.log("Product response:", productResponse);
      setApiResponse(productResponse);
      setProduct(productResponse.data);

      // Fetch price for this product
      try {
        console.log(`Fetching price for product ID: ${productId}`);
        const priceResponse = await pricesAPI.getByProduct(productId);
        console.log("Price response:", priceResponse);
        setPrice(priceResponse.data[0] || null);
      } catch (priceErr: any) {
        console.error("Error fetching price:", priceErr);
        // We don't want to stop showing the product if price fetch fails
      }

      setError(null);
    } catch (err: any) {
      console.error("Error fetching product:", err);
      setError(
        `Failed to fetch product details: ${
          err.response?.data?.message || err.message || "Unknown error"
        }`
      );
      setApiResponse(err.response || err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCart(product._id, quantity);
      router.push("/cart");
    } catch (err: any) {
      console.error("Failed to add to cart:", err);
      setError(
        `Failed to add to cart: ${
          err.response?.data?.message || err.message || "Unknown error"
        }`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error:</p>
          <p>{error || "Product not found"}</p>
          {apiResponse && (
            <details className="mt-2">
              <summary className="cursor-pointer text-sm">Debug Info</summary>
              <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </details>
          )}
        </div>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => router.push("/products")}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
          >
            Back to Products
          </button>
          <button
            onClick={() => fetchProductAndPrice(id)}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-80 md:h-full">
          {product.productImage.url ? (
            <Image
              src={product.productImage.url}
              alt={product.productName}
              fill
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="mb-4">
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          {price ? (
            <div className="text-2xl font-semibold mb-4">
              {price.amount} {price.currency} per {price.unit}
            </div>
          ) : (
            <div className="text-lg text-gray-500 mb-4">
              Price information not available
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="quantity" className="block mb-1 text-sm">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-20 p-2 border rounded"
              />
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isCartLoading}
              className="flex-grow bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              {isCartLoading ? "Adding to Cart..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
