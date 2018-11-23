import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService } from "shared/services/auth.service";
import { Router } from "@angular/router";
import { OrderService } from "shared/services/order.service";
import { OnDestroy } from "@angular/core";
import { Order } from "shared/models/order";
import { Input } from "@angular/core";
import { ShoppingCart } from "shared/models/shopping-cart";

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping={};
  userSubscription: Subscription;
  userId:string;
  constructor(
    private router:Router,
    private authService:AuthService,
    private orderService: OrderService){ }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
 
  async placeOrder(){
    let order = new Order(this.userId,this.shipping,this.cart);
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success',result.key])

   }
}
