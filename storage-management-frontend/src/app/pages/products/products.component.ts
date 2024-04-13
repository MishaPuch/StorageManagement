import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  user: User | null=null;
  products:Product[] =[];
  constructor(private _productService : ProductService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.user = storedUser ? JSON.parse(storedUser) : null;

    this._productService.GetAllProducts().then(products=>{
        this.products= products;
      });   
    
  }
}
