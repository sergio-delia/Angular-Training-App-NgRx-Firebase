import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

import { from, Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit /*, OnDestroy*/ {

  maxDate: any;
  isLoading = false;
  isLoadingSubs = new Subscription;

  isLoading$: Observable<boolean>

  constructor(private authService: AuthService, private uiservice: UiService, private store: Store<fromRoot.State>){}

  onSubmit(forms: NgForm){
    console.log(forms);
    this.authService.registerUser({email: forms.value.email, password: forms.value.password})
  }

  ngOnInit() {



    /* this.uiservice.loadingStateChanged.subscribe(loading =>{
      this.isLoading = loading;
    }); */
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
  }

  /*ngOnDestroy(){
    if(this.isLoadingSubs){
      this.isLoadingSubs.unsubscribe();
    }
  }*/

}
