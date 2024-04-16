import { OrderDetails } from './../models/order-details';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RequestDetails } from './requestDetails';
import { Product } from './../models/product';
import { User } from '../models/user';
import { resourceUsage } from 'process';

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

  async AddBucket(products: Product[] , user: User): Promise<void> {
    try {
        
        const order: any = {
            userID: user.id,
            details: [
              {
                productId: products[0].id,
                amount: 1,
                status: "bucket"
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
  async AddOrder(products: OrderDetails[] , user: User): Promise<void> {
    try {
      
        const order: any = {
            userID: user.id,
            details: products.map(product => ({
                productId: product.productId,
                amount: product.amount,
                status: "in work"
            }))
        };
        const response = await this.http.put<any>(`${this._requestDetails.Url}/Order`, order, this._requestDetails.httpOptions).toPromise();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  }

  async UpdateBucket(products: OrderDetails[] | undefined, user: User | null): Promise<void> {
    try {
      if(user===null){
        return;
      }
        const order: any = {
            userID: user.id,
            details: products?.map(product => ({
                productId: product.productId,
                amount: product.amount,
                status: "bucket"
            }))
        };
        const response = await this.http.put<any>(`${this._requestDetails.Url}/Order`, order, this._requestDetails.httpOptions).toPromise();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  }

  async GetBucketByUserId(userId:number | undefined): Promise<Order | null> {
    try {        
      const response = await this.http.get<any>(`${this._requestDetails.Url}/Order/bucket/${userId}`, this._requestDetails.httpOptions).toPromise();
      this.order=response;
      return this.order;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
