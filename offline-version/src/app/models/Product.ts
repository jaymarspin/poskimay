export interface Product {
  id?: number;
  name: string;

  description: string;
  barcode: string;

  category_id: number;
  productImage?: ProductImage;
  stocks?: ProductStocks;
  price?: ProductPrice;
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
