import axios from 'axios';
import config from './config';

const API_URL = config.apiUrl;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Types based on backend models
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface ProductImage {
  url: string;
  publicId: string;
}

export interface Product {
  _id: string;
  productName: string;
  productDescription: string;
  productImage: ProductImage;
  currentPrice: number;
  content: string;
  stars: number;
  createdAt: string;
  updatedAt: string;
}

export interface PriceRange {
  minBooking: number;
  maxBooking: number;
  price: number;
}

export interface Price {
  _id: string;
  product: string;
  priceRanges: PriceRange[];
  isActive: boolean;
  createdAt: string;
}

export interface CartItem {
  _id: string;
  product: string | Product;
  quantity: number;
  user: string;
}

export interface Batch {
  _id: string;
  name: string;
  products: string[] | Product[];
}

// API functions for auth
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/users/login', { email, password }),
  
  register: (userData: any) => 
    api.post('/users/register', userData),
  
  getProfile: () => api.get('/users/profile'),
};

// API functions for products
export const productsAPI = {
  // Get all products
  getAll: () => api.get<Product[]>('/products'),

  // Get product by ID
  getById: (id: string) => api.get<Product>(`/products/${id}`),

  // Create new product (admin only, with image upload)
  create: (productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>, imageFile: File) => {
    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    formData.append('image', imageFile);
    return api.post<Product>('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (id: string, productData: Partial<Product>) => 
    api.put(`/products/${id}`, productData),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// API functions for prices
export const pricesAPI = {
  // Get all prices (Admin only)
  getAll: () => api.get<{ prices: Price[] }>('/prices'),

  // Create a new price (Admin only)
  create: (priceData: Omit<Price, '_id' | 'createdAt'>) =>
    api.post<{ price: Price; message: string }>('/prices', priceData),

  // Update price by ID (Admin only)
  update: (id: string, priceData: Partial<Omit<Price, '_id' | 'createdAt'>>) =>
    api.put<{ price: Price; message: string }>(`/prices/${id}`, priceData),

  // Delete price by ID (Admin only)
  delete: (id: string) =>
    api.delete<{ message: string }>(`/prices/${id}`),

  // Get price by product ID
  getByProduct: (productId: string) =>
    api.get<{ price: Price }>(`/prices/product/${productId}`),

  // Calculate price for product based on booking count
  calculate: (productId: string, bookingCount: number) =>
    api.get<{ price: number }>(`/prices/calculate/${productId}?bookingCount=${bookingCount}`),
};

// API functions for cart
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addItem: (productId: string, quantity: number) => 
    api.post('/cart', { product: productId, quantity }),
  updateItem: (itemId: string, quantity: number) => 
    api.put(`/cart/${itemId}`, { quantity }),
  removeItem: (itemId: string) => api.delete(`/cart/${itemId}`),
};

// API functions for batches
export const batchesAPI = {
  getAll: () => api.get('/batches'),
  getById: (id: string) => api.get(`/batches/${id}`),
  create: (batchData: Omit<Batch, '_id'>) => 
    api.post('/batches', batchData),
  update: (id: string, batchData: Partial<Batch>) => 
    api.put(`/batches/${id}`, batchData),
  delete: (id: string) => api.delete(`/batches/${id}`),
};

export default api; 