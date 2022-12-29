import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router'
import { Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer'

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<fromRoot.State>, private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      /*
      Gestito da Redux
      if (this.authService.isAuth()){
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }*/
      return this.store.select(fromRoot.getisAuth)
  }

  canLoad(route: Route){
    /* Gestito da Redux
    if (this.authService.isAuth()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }*/
    return this.store.select(fromRoot.getisAuth)
    // Potrebbe essere necessario utilizzare pipe(take(1)) per dire di prendere un solo valore e chiudere la funzione
  }

}
