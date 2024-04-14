import { Product } from "./product";

export interface OrderDetails {
    id: number | null;
    productId: number | undefined;
    orderId: number | null;
    amount: number;
    status: string,
    product?: Product ;
  }