import { OrderDetails } from "./order-details";
import { User } from "./user";

export interface Order {
    ID: number;
    Date: Date;
    UserID: number;
    User?: User;
    Details?: OrderDetails[];
  }