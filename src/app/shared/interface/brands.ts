export interface Brands {
  results: number
  metadata: brandData
  data: IBrands[]
}

export interface brandData {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface IBrands {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
