import { Component } from '@angular/core';
import { User } from '../../models/user';
import { OrderDetailService } from '../../services/orderDetail.service';
import { OrderDetails } from '../../models/order-details';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  user: User | null = null;
  orders: any[]  =[];
  totalPrice: number = 0;

  constructor(private _orderDetailService: OrderDetailService ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.user = storedUser ? JSON.parse(storedUser) : null;
    this._orderDetailService.GetOrderDetailsByUserId(this.user?.id).then(orders => {

      this.orders = orders;
      if (this.orders) {
        this.totalPrice = this.orders.reduce((total, order) => {
          if (order.product && order.product.unitPrice) {
            return total + (order.product.unitPrice*order.amount);
          }
          return total;
        }, 0);
      }
    }).catch(error => {
      console.error('Error fetching orders:', error);
    });
  }
  
}
