import { Component, OnInit } from '@angular/core';
//import { Observable, of } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from "shared/models/app-user";
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { Observable } from "rxjs/internal/Observable";
import { ShoppingCart } from "shared/models/shopping-cart";

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  //shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
    //auth.AppUser$.subscribe(appUser =>this.appUser = appUser);
  }

  async ngOnInit() {
    this.auth.AppUser$.subscribe(
      appUser => {
        this.appUser = appUser
      }
    );
    this.cart$ = await this.shoppingCartService.getCart();
    //cart$.valueChanges().subscribe(cart=> {
    // this.shoppingCartItemCount=0;
    // for( let productID in cart.items){
    //   console.log("productID",productID);
    //   this.shoppingCartItemCount += cart.items[productID].quantity;
    // }
    // });
  }
  logout() {
    this.auth.logout();
  }


}
