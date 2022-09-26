import { Product, ProductPrice } from "./Product";

 

export interface wholesold {
  id?: number;
  cash: number;
  extras?: any;
  sold?: sold[],
  createdAt?: any;

 
}

export interface sold {
  data?: any;
  id?: number;
  whole_sold_id: number;
    product_id: number;
    quantity: number;
  price_id: ProductPrice;
  price?: ProductPrice,
  product?: Product;
}

 