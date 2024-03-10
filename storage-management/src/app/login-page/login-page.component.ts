import { Component } from '@angular/core';
import { Login } from '../models/login.model';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    CardModule,
    
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  title = 'storage-management';

  loginForm='';
  passwordForm='';

  login:Login = {
  login:'',
  password:''
}

  onClick(){
    this.login.login=this.loginForm;
    this.login.password=this.passwordForm;
  }
}
