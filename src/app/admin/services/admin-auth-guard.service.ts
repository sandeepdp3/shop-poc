import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, RouterStateSnapshot} from '@angular/router';
import { AuthService } from 'shared/services/auth.service' ;
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }
  
  canActivate():Observable<boolean> {
    return this.auth.AppUser$
    .map(appUser => appUser.isAdmin);

  }
}
