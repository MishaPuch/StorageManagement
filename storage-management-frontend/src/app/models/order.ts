import { OrderDetails } from "./order-details";
import { User } from "./user";

export interface Order {
    id: number;
    date: string;
    userID: number;
    user?: User;
    details?: OrderDetails[];
  }