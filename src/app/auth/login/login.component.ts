import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  //isLoading = false;
  isLoading$: Observable<boolean>

  private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiservice: UiService, private store: Store<fromRoot.State>){}

  ngOnInit(){


    this.isLoading$ = this.store.select(fromRoot.getIsLoading)

    //this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));

    // this.loadingSubs = this.uiservice.loadingStateChanged.subscribe(loading => {
    //   this.isLoading = loading;
    // })

    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]})
    })
  }

  onSubmit(){
    console.log(this.loginForm.value);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }

  // ngOnDestroy(){
  //   if(this.loadingSubs){
  //     this.loadingSubs.unsubscribe();
  //   }
  // }
}
