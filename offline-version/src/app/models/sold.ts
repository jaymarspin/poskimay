 

export interface wholesold {
  id?: number;
  cash: number;
  extras: any;
  sold?: sold
 
}

export interface sold {
  id?: number;
  whole_sold_id: number;
    product_id: number;
    quantity: number;
  price_id: any;
}

 