export interface CartItem {
  sku: string;
  count: number;
}

export interface ProductItem {
  sku: string;
  name: string;
  image: string;
  price: number;
}

export interface ISubmitPayload {
  cart: {
    [key: string]: number;
  };
}
