export interface ICategoriesResponse {
  results: number;
  metadata: Metadata;
  data: ICategory[]; // List of categories
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  // Add the products property here, assuming each category contains a list of products
  products: IProduct[]; // New property to hold products for each category
}


export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}
