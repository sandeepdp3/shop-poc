import { Product } from 'shared/models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from "shared/services/product.service";
import { Router, ActivatedRoute } from "@angular/router";
//import { Product } from "src/app/shared/models/product";
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { Subscription } from "rxjs";
import { OnDestroy } from "@angular/core";
import { ShoppingCart } from "shared/models/shopping-cart";
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
 
  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService, 
    private shoppingCartService: ShoppingCartService) 
  { 

  
  }

  async ngOnInit() {
    //  this.subscription = (await this.shoppingCartService.getCart()).valueChanges()
    //  .subscribe(cart => this.cart = cart);
    
    //this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);
    this.cart$ = (await this.shoppingCartService.getCart());
    this.populateProducts();
  }
  
  private populateProducts(){
        
    this.productService
      .getAll()
      .switchMap(products=> {
          this.products = products;
          return this.route.queryParamMap;
      })
        .subscribe(params => {
          this.category = params.get('category');
          this.applyFilter();
      });
  }
  private applyFilter(){
    this.filteredProducts = (this.category) ?
    this.products.filter( p => p.category === this.category) :
    this.products;
  }


}
