import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { Product } from "shared/models/product";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from "shared/models/shopping-cart";
import { AngularFireObject } from "angularfire2/database";
import { Observable } from "rxjs";
import { ShoppingCartItem } from "shared/models/shopping-cart-item";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .map((x: { items: { [productId: string]: ShoppingCartItem } }) => new ShoppingCart(x.items));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: String, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId)
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$: Observable<any> = this.getItem(cartId, product.id).valueChanges();
    let item$$ = this.getItem(cartId, product.id);
    item$.take(1).subscribe(item => {
     //let quantity = (item.quantity || 0) + change;
     if(item !=null)
     {
      let quantity = (item.quantity || 0) + change;
      if(quantity ===0) item$$.remove();
      else
      item$$.update({ 
        title:product.title,
        imageUrl:product.imageUrl,
        price:product.price,
        quantity: quantity });
     } else if (item === null)
        item$$.set({ 
          title:product.title,
          imageUrl:product.imageUrl,
          price:product.price,
          quantity: 1 });
    });

  }


}
 
////////////////
// private async updateItem(product: Product, change: number) {
//   let cartId = await this.getOrCreateCartId();
//   let item$: Observable<any> = this.getItem(cartId, product.id).valueChanges();
//   let item$$ = this.getItem(cartId, product.id);
//   item$.take(1).subscribe(item => {
//     if (item === null)
//       item$$.set({ 
//         title:product.title,
//         imageUrl:product.imageUrl,
//         price:product.price,
//         quantity: 1 });
//     else
//       item$$.update({ 
//         title:product.title,
//         imageUrl:product.imageUrl,
//         price:product.price,
//         quantity: item.quantity + change });

//   });

// }

///////////

/* addtoCart method
    // let cartId = await this.getOrCreateCartId();
    // let item$: Observable<any> = this.db.object('/shopping-carts/' + cartId + '/items/' + product.id).valueChanges();
    // let item$$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.id);
    // console.log("product key", product);
    // item$.take(1).subscribe( item => {
    //    if( item === null ) {
    //       item$$.set({product: product, quantity: 1});
    //       console.log('adding new product to cart');
    //     }else{
    //       item$$.update({quantity: item.quantity + 1});
    //       console.log('updating exisiting product ');
    //     }
    //   }); 
    
    ///////////////////////////////
   //updateItem Quanity Method
    private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$: Observable<any> = this.getItem(cartId, product.id).valueChanges();
    let item$$ = this.getItem(cartId, product.id);
    item$.take(1).subscribe(item => {
      if (item === null)
        item$$.set({ product: product, quantity: 1 });
      else
        item$$.update({ quantity: item.quantity + change });

    });

  }
    
    */

////////////////////////////////
  // async getCart(): Promise<AngularFireObject<ShoppingCart>>{
  //   let cartId = await this.getOrCreateCartId();
  //   return this.db.object('/shopping-carts/' + cartId)
  // }