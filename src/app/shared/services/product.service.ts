import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import { Observable } from "rxjs";
import 'rxjs/add/operator/switchMap';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

    
  constructor(private db: AngularFireDatabase) { }

  create(product)
  {
    return this.db.list('/products').push(product);
  }
  // getAll()
  // {
  //   //below code is working
  //   return this.db.list('/products').snapshotChanges();
  // }
  getAll(): Observable<Product[]>
   {
    return this.db.list<Product>('/products')
        .snapshotChanges()
        .pipe(
            map(changes =>
                changes.map(c => {
                    const data = c.payload.val() as Product;
                    const id = c.payload.key;
                    return { id, ...data };
                })
            )
        );
      
}
  getProduct(productId)
  {
    //return this.db.list('/products/'+ productId).valueChanges();
    return this.db.object('/products/'+ productId);
  }
  updateProduct(productId,product)
  {
    return this.db.object('/products/' + productId).update(product);
  }
  delete(productId)
  {
    return this.db.object('/products/'+ productId).remove();
  }

}
