import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, cartAPI, Product } from './api';
import { useAuth } from './auth-context';

interface CartContextType {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => void;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    const product = item.product as Product;
    // Simple calculation - in a real app, you'd look up the price
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  // Fetch cart when user logs in
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setItems([]);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const response = await cartAPI.getCart();
      setItems(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch cart');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      setIsLoading(true);
      await cartAPI.addItem(productId, quantity);
      await fetchCart(); // Refresh cart
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      setIsLoading(true);
      await cartAPI.updateItem(itemId, quantity);
      await fetchCart(); // Refresh cart
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setIsLoading(true);
      await cartAPI.removeItem(itemId);
      await fetchCart(); // Refresh cart
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to remove item');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    // This would need a backend endpoint to clear the entire cart
    // For now, we'll just clear it client-side
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 