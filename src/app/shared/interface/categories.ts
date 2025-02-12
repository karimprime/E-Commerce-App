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
}
