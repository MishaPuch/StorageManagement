import { Category } from "./category";

export interface Product  {
    id?: number;
    name: string;
    description: string;
    unitPrice: number;
    photo: string;
    categoryID: number;
    category?: Category;
  }