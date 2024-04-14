import { OrderDetails } from './../models/order-details';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RequestDetails } from './requestDetails';
import { Product } from './../models/product';

@Injectable({ providedIn: 'root' })
export class OrderDetailService {
  constructor(private http: HttpClient, private router: Router , private  _requestDetails: RequestDetails ){ }

  public orders: OrderDetails[]  = [];

  async GetAllOrderDetails(): Promise<OrderDetails[]> {
    try {
      const response = await this.http.get<any>(`${this._requestDetails.Url}/OrderDetails`, this._requestDetails.httpOptions).toPromise();
      this.orders = response;
      console.log(this.orders)
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    return this.orders;
  }
  async GetOrderDetailsByUserId(id:number | undefined): Promise<OrderDetails[]> {
    try {
      const response = await this.http.get<any>(`${this._requestDetails.Url}/OrderDetails/UserOrderDetails/${id}`, this._requestDetails.httpOptions).toPromise();
      this.orders = response;

    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    return this.orders;
  }
  async GetInWorkOrderDetails(): Promise<OrderDetails[]> {
    try {
      const response = await this.http.get<any>(`${this._requestDetails.Url}/OrderDetails/GetInWorkOrderDetails`, this._requestDetails.httpOptions).toPromise();
      this.orders = response;

    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    return this.orders;
  }
}