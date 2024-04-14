import { OrderDetails } from './../models/order-details';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RequestDetails } from './requestDetails';
import { Product } from './../models/product';
import { User } from '../models/user';

export interface Order {
    id: number; 
    date: string;
    userID: number;
    user?: User;
    details?: OrderDetails[];
}

// Сервис OrderService
@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient, private router: Router , private  _requestDetails: RequestDetails ){ }

  public orderDetails: OrderDetails[]  = [];
  public order: Order | null=null;


  async AddOrderDetails(products: Product[] , user: User): Promise<void> {
    try {
        const order: Order = {
            id: 23, // Используем id
            date: new Date().toISOString(),
            userID: user.id,
            user: user,
            details: [
              {
                id: 23,
                productId: products[0].id,
                orderId: 23,
                amount: 1,
                status: "in work",
                product: products[0]
              }
            ]
          };
          
    
        
      debugger;  
      const response = await this.http.post<any>(`${this._requestDetails.Url}/Order`, order, this._requestDetails.httpOptions).toPromise();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
