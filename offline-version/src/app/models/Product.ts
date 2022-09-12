import { Category } from "./category";

export interface Product {
  id?: number;
  name: string;

  description: string;
  barcode: string;

  category_id: number;
  category?: Category;
  productImage?: ProductImage;
  stocks?: ProductStocks;
  price?: ProductPrice;
  createdAt?: string;
}

export interface ProductImage {
  id?: number;
  product_id: number;

  blobdata: any;
}

export interface ProductStocks {
  id?: number;
  product_id: number;

  stocks_count: number;
}

export interface ProductPrice {
  id?: number;
  product_id: number;

  price: number;
}
