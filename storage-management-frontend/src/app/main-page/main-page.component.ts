import { Component, OnInit } from '@angular/core';
import { User } from './../models/user.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  user: User | null=null;

  constructor() {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.user = storedUser ? JSON.parse(storedUser) : null;
    console.log(this.user);
  }
}
