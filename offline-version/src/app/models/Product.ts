export interface Product {
  id?: number;
  name: string;

  description: string;
  barcode: string;

  category_id: number;
}

export interface ProductImage {
  id?: number;
  product_id: number;

  blobdata: any;
}
