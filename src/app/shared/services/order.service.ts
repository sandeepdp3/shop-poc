import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { ShoppingCartService } from "shared/services/shopping-cart.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase, private shoppingCartService:ShoppingCartService) {
    }
  
 async storeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders(){
    return this.db.list('/orders').valueChanges();
  }

  getOrderByUser(userId:string){
    return this.db.list('/orders', ref => ref.limitToLast(25).orderByChild('name')).snapshotChanges()
    .map(orders => { return orders.map(c => ({ key: c.payload.key, ...c.payload.val() })); });
  }
 
}
