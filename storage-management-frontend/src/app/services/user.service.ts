import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private router: Router) { }

  user: User | null = null;

  async VerifyUser(login: string, password: string): Promise<User | null> {
    try {
      const response = await this.http.get<any>(`https://localhost:7073/api/User/${login}/${password}`, httpOptions).toPromise();
      this.user = response.user;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
    return this.user;
  }
}
