import { Category } from "./products";

export interface ICart {
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  _id: string;
  products: Product[];
  totalCartPrice: number;
}

export interface Product {
  count: number;
  _id: string;
  product: ProductDetails;
  price: number;
}

export interface ProductDetails {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// New interface for clearCart API response
export interface ICartResponse {
  message: string;
}








