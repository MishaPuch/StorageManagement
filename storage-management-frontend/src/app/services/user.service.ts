import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { RequestDetails } from './requestDetails';
import { Role } from '../models/role';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private router: Router , private  _requestDetails: RequestDetails ){ }

  role: Role = {
    id: 1,
    name: 'user',
  };

  user: User = {
    id:0,
    name: '',
    email: '',
    address: '',
    password: '',
    roleId:1,
    role:this.role
  };
  async VerifyUser(login: string, password: string): Promise<User | null> {
    try {
      const response = await this.http.get<any>(`${this._requestDetails.Url}/User/${login}/${password}`, this._requestDetails.httpOptions).toPromise();
      this.user = response.user;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    return this.user;
  }
  async UpdateUser(user: User|null): Promise<User | null> {
    try {
      const response = await this.http.put<any>(`${this._requestDetails.Url}/User`, user , this._requestDetails.httpOptions).toPromise();
      this.user = response.user;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    return this.user;
  }
  async AddUser(user:User | null):Promise<User>{
    try {
      
      const response = await this.http.post<any>(`${this._requestDetails.Url}/User`, user , this._requestDetails.httpOptions).toPromise();
      this.user = response.user;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    return this.user;
  }

}
