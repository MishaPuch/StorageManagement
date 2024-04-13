import { Category } from "./category";

export interface Product {
    ID?: number;
    Name: string;
    Description: string;
    UnitPrice: number;
    Photo: string;
    CategoryID: number;
    Category?: Category;
  }