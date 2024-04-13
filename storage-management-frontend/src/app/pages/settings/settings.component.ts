import { User } from './../../models/user';
import { ProductService } from '../../services/product.service';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  user:User|null=null;


  constructor(private _userService : UserService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }
  onClick(){
    this._userService.UpdateUser(this.user).then(user=>{
      this.user=user;
    });   
    if (this.user !== null) {
      localStorage.setItem('currentUser', JSON.stringify(this.user));
    }
  }
  
}
