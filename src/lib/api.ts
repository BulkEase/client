import axios from 'axios';
import config from './config';

const API_URL = config.apiUrl;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let authToken: string | null = null;

// Function to set the auth token
export const setAuthToken = (token: string | null) => {
  authToken = token;
};

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
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
  name?: string;
  description?: string;
  category?: string;
}

export interface ProductsResponse {
  products: Product[];
}

export interface Price {
  _id: string;
  product: string;
  amount: number;
  currency: string;
  unit: string;
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
  getAll: () => api.get<ProductsResponse>('/products'),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  create: (productData: Omit<Product, '_id'>) => 
    api.post('/products', productData),
  update: (id: string, productData: Partial<Product>) => 
    api.put(`/products/${id}`, productData),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// API functions for prices
export const pricesAPI = {
  getAll: () => api.get('/prices'),
  getById: (id: string) => api.get(`/prices/${id}`),
  getByProduct: (productId: string) => api.get(`/prices/product/${productId}`),
  create: (priceData: Omit<Price, '_id'>) => 
    api.post('/prices', priceData),
  update: (id: string, priceData: Partial<Price>) => 
    api.put(`/prices/${id}`, priceData),
  delete: (id: string) => api.delete(`/prices/${id}`),
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