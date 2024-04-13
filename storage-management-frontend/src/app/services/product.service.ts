import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RequestDetails } from './requestDetails';
import { Product } from './../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient, private router: Router , private  _requestDetails: RequestDetails ){ }

  public product: Product[]  = [];

  async GetAllProducts(): Promise<Product[]> {
    try {
      const response = await this.http.get<any>(`${this._requestDetails.Url}/Product`, this._requestDetails.httpOptions).toPromise();
      this.product = response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    return this.product;
  }
}