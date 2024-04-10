import { User } from './../models/user.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './../models/login.model';
import { HttpClient , HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  user: User | null = null; 
  constructor(private http: HttpClient, private router: Router) {} 
  
  title = 'storage-management';
  loginForm = '';
  passwordForm = '';

  login: Login = {
    login: '',
    password: ''
  };

  onClick() {
  
    this.login.login = this.loginForm;
    this.login.password = this.passwordForm;
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
      })
    };
  
    const encodedLogin = encodeURIComponent(this.login.login);
    const encodedPassword = encodeURIComponent(this.login.password);

    this.http.get<any>(`https://localhost:7073/api/User/${encodedLogin}/${encodedPassword}`, httpOptions).subscribe(
          response => {
            this.user = response.user;
            localStorage.setItem('currentUser', JSON.stringify(this.user));
            this.router.navigateByUrl('/main');
          },
          error => {
            console.error('Error:', error);
          }
    );
  }
}
