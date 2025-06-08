export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: 'men' | 'women' | 'unisex';
  fragranceFamily: string;
  description: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  sizes: ProductSize[];
  rating?: number;
  reviews?: number;
  featured?: boolean;
}

export interface ProductSize {
  size: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  shippingAddress: ShippingAddress;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  zipCode?: string;
  notes?: string;
}