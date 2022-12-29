import { Observable, Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth: boolean = false;
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, private authService: AuthService){}


  ngOnInit(){
   /*
   Gestito da Redux
   this. authSubscription = this.authService.authChange.subscribe(authStatus =>{
      this.isAuth = authStatus;
    })*/
    this.isAuth$ = this.store.select(fromRoot.getisAuth);
  }

  /*
  Non serve con Redux
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  } */

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }
}
