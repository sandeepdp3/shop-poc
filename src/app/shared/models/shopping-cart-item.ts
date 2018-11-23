
//import { Product } from "src/app/product";

export class ShoppingCartItem {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;
   constructor(init?: Partial<ShoppingCartItem>){
       Object.assign(this,init);
   }
    get totalPrice(){ return this.price * this.quantity }
}