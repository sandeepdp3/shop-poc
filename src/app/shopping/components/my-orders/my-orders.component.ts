import { Component, OnInit } from '@angular/core';
import { OrderService } from "shared/services/order.service";
import { AuthService } from "shared/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;
  constructor(
    private orderService: OrderService,
    private authService: AuthService) {
    this.orders$ = authService.user$.switchMap(u => orderService.getOrderByUser(u.uid));
  }

}
