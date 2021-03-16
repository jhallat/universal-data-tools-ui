import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../state/app.state';
import { ConnectionToken } from './connection';
import { getConnectionToken } from './state';

@Injectable({
  providedIn: 'root'
})
export class ConnectionGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.debug("Called connection guard");
      const token = window.localStorage.getItem("connection-token");
      if (token != null && token.trim.length > 0) {
        return true;
      } 
      this.router.navigate(['/connection']);
      return false;
  }
  
}
