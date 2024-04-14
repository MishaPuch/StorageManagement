import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { OrderDetailService } from '../../services/orderDetail.serviice';
import { OrderDetails } from '../../models/order-details';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'] 
})
export class ProductsComponent {
  user: User | null = null;
  products: Product[] = [];

  constructor(private _productService: ProductService, private _orderDetailsService: OrderDetailService, private _orderService : OrderService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.user = storedUser ? JSON.parse(storedUser) : null;

    this._productService.GetAllProducts().then(products => {
      this.products = products;
    });   
  }

  OnClick(product: Product): void {
    console.log(`${product.name} is ordered`);
    
    if (!this.user){
      return;
    }
    this._orderService.AddOrderDetails([product] , this.user); 
  }  
  
}
