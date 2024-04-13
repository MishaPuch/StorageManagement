import { Product } from "./product";

export interface OrderDetails {
    ID: number;
    ProductId: number;
    OrderId: number;
    Amount: number;
    Product?: Product;
  }