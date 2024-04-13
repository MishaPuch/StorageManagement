import { Router } from '@angular/router';
import { Role } from './../models/role';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

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

  constructor(private _userService: UserService ,private router: Router) {}

  ngOnInit() {}

  onClick() {
    if (!this.user) {
      return;
    }
    this.user.role = this.role;
    debugger;

    this._userService.AddUser(this.user).then(user => {
      this.user = user;
      if (user !== null) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigateByUrl('/');
      }
    });
  }
}
