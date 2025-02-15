import { Brand, Category, Subcategory } from "./products";

// cart.interface.ts
export interface ICartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId: string;
  data: ICart; // ICart contains the products array
}

export interface ICart {
  _id: string;
  cartOwner: string;
  products: ICartProduct[]; // This is what we're using
  createdAt: string;
  updatedAt: string;
  totalCartPrice: number;
  __v?: number;
}

export interface ICartProduct {
  count: number;
  _id: string;
  product: IProduct; // Nested product details
  price: number;
}

export interface IProduct {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}
