import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  //user: User | null = null; 
  constructor(private http: HttpClient, private router: Router, private _userService:UserService) {} 
  
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
  
    const encodedLogin = encodeURIComponent(this.login.login);
    const encodedPassword = encodeURIComponent(this.login.password);
  
    this._userService.VerifyUser(encodedLogin, encodedPassword)
      .then(user => {
        if (user !== null) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigateByUrl('/main');
        }
      })
      .catch(error => {
        console.error('Error verifying user:', error);
      });
  }
  
}
