import { Component } from '@angular/core';
import { User } from '../../models/user';
import { Order, OrderService } from '../../services/order.service';
import { OrderDetails } from '../../models/order-details';
import { Product } from '../../models/product';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})
// BucketComponent
export class BucketComponent {
  user: User | null = null;
  orders: Order | null = null;
  totalPrice: number = 0;

  constructor(private _orderService: OrderService) { }

  async ngOnInit(): Promise<void> {
      const storedUser = localStorage.getItem('currentUser');
      this.user = storedUser ? JSON.parse(storedUser) : null;

      try {
          await this._orderService.GetBucketByUserId(this.user?.id).then(order =>
              this.orders = order
          );
          console.log(this.orders)

      } catch (error) {
          console.error('Error fetching orders:', error);
      }
  }

  AddAmountin(addProduct: Product) {
    if (!this.orders || !this.orders.details) return;
    
    this.orders.details = this.orders.details.map(product => {
        if (addProduct.id === product.productId && product.amount < 200) {
            product.amount++;
            this._orderService.UpdateBucket(this.orders?.details, this.user)
        }
        return product;
    });
}

MinorAmountin(minorProduct: Product) {
    if (!this.orders || !this.orders.details) return;
    
    this.orders.details = this.orders.details.map(product => {
        if (minorProduct.id === product.productId && product.amount > 0) {
            product.amount--;
            this._orderService.UpdateBucket(this.orders?.details, this.user)
        }
        return product;
    });
}

DeleteProduct(deletingProduct: Product) {
    if (!this.orders || !this.orders.details) return;

    this.orders.details = this.orders.details.filter(product => product.productId !== deletingProduct.id);
    this._orderService.UpdateBucket(this.orders.details , this.user)
}


  OnSubmit() {
      console.log("buy");
      if (!this.user || !this.orders) {
          return;
      }
      this._orderService.AddOrder(this.orders.details || [], this.user);
  }
}
