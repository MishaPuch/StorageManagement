import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { first } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  user: User | null=null;
  products:Product[] =[];
  constructor(private _productService : ProductService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.user = storedUser ? JSON.parse(storedUser) : null;

    this._productService.GetAllProducts().then(products=>{
        this.products= products.slice(0- 10);
      });   
    
  }
}
