import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router){}
  title = 'storage-management-frontend';

  isNavBarVisible():boolean{
    if (this.router.url !== "/" && this.router.url !== "/registration") {
      return true;
    }
    return false;
  }
}
