import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  //public categoryList: any = [];

  constructor(private db: AngularFireDatabase) { }

  getAll(){
    //return this.db.list('/categories', ref => ref.limitToLast(25).orderByChild('name')).valueChanges();
    //return this.db.list('/categories', ref => ref.limitToLast(25).orderByChild('name')).snapshotChanges();
    return this.db.list('/categories', ref => ref.limitToLast(25).orderByChild('name')).snapshotChanges()
    .map(categories => { return categories.map(c => ({ key: c.payload.key, ...c.payload.val() })); }); 
  }
  
}

