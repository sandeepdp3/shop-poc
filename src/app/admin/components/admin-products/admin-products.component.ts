import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Observable } from "rxjs/internal/Observable";
import { Subscription } from "rxjs/Subscription";
import { DataTableResource } from "angular5-data-table";
import { Product } from "shared/models/product";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>
  items: Product[] = [];
  itemCount: number;
  
  constructor(private productService: ProductService) {
  
   this.subscription = this.productService.getAll().subscribe(products => {
   this.products = products
   this.initializationTable(products); 
  });
  //this.products$ = this.productService.getAll().subscribe( p=> {this.products$ =p; console.log("ProductList: ", this.products$)});

  //  this.productService.getAll().subscribe(
  //     (p) => {
  //       for (let i = 0; i < p.length; i++) {
  //         let product: any = {}
  //         product = p[i].payload.val();
  //         product.key = p[i].key;
  //         this.products.push(product);
  //       }
      
  //     });
  //   console.log(this.products);
  }

  private initializationTable(products: Product[])
  {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 }).then(items => this.items = items);
    this.tableResource.count().then(count=> this.itemCount =count);
  }
  reloadItems(params)
  {
    if(! this.tableResource) return;

    this.tableResource.query({ params }).then(items => this.items = items);
  }
  filter(query: string)
  {
    let filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;

    this.initializationTable(filteredProducts)
  }

  ngOnDestroy(){
      this.subscription.unsubscribe();
  }
  ngOnInit() {
  }

}
