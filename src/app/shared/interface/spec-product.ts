export interface SpecProduct {
  data: DataSpecProduct;
}

export interface DataSpecProduct {
  sold: number;
  images: string[];
  subcategory: Brand[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Brand;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string; // Changed to string for API consistency
  updatedAt: string;
  __v: number;
  reviews: any[];
  id: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  category?: string;
}
