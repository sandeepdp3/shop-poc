import { Injectable } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:AngularFireDatabase) {

   }
   save(user:firebase.User){
     this.db.object('/users/' + user.uid).update({
       name: user.displayName,  
       email: user.email
     });
   }
   get$(uid: string): Observable<AppUser> {
     return this.db.object<AppUser>('/users/' + uid).valueChanges();
   }
}
