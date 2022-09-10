export interface Product {
  id?: number;
  name: string;

  description: string;
  barcode: string;

  category_id: number;
  productImage?: ProductImage;
}

export interface ProductImage {
  id?: number;
  product_id: number;

  blobdata: any;
}
