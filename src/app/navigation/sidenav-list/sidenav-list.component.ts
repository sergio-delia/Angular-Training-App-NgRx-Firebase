import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { from, Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit{
@Output() closeSidenav = new EventEmitter<void>();

isAuth: boolean = false;
isAuth$: Observable<boolean>;
authSubscription: Subscription;

constructor(private store:Store<fromRoot.State>, private authService: AuthService){}

ngOnInit() {
  this.isAuth$ = this.store.select(fromRoot.getisAuth);
  /*
  this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    this.isAuth = authStatus;
  }) */
}

/*
Non serve con Redux
ngOnDestroy() {
  this.authSubscription.unsubscribe()
}
*/

  onClose(){
    this.closeSidenav.emit();
  }

  onLogout(){
    console.log('Click');

    this.authService.logout();
    this.onClose();
  }
}
