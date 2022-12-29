import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { User } from "./user.model";

import { AngularFireAuth } from "@angular/fire/compat/auth";
import { TrainingService } from "../training/training.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UiService } from "../shared/ui.service";

import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

import * as Auth from '../auth/auth.actions';

@Injectable()
export class AuthService {

 /*
 Gestito da Redux ora
 authChange = new Subject<boolean>();
  private isAuthenticated = false;
*/
  constructor(
      private router: Router,
      private afAuth: AngularFireAuth,
      private trainingService: TrainingService,
      private snackbar: MatSnackBar,
      private uiservice: UiService,
      private store: Store<fromRoot.State>
  ){}

  initAuthListener(){
    /**
     * afAuth.authState prende in automatico lo stato dell'utente effettuando operazioni quando c'è un cambio nel suo stato
     */
    this.afAuth.authState.subscribe(user => {
      if(user){
        /*
        Gestito ora da Redux sotto
        this.isAuthenticated = true;
        this.authChange.next(true);*/
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training'])
      } else {
        this.trainingService.cancelSubscription();
        /* Gestito da Redux sotto
        this.isAuthenticated = false;
        this.authChange.next(false) */
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login'])
      }
    })
  }

  registerUser(authData: AuthData){

    //this.uiservice.loadingStateChanged.next(true);
    //this.store.dispatch({type: 'START_LOADING'});
    this.store.dispatch(new UI.StartLoading())

    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password).then(result =>{
      console.log(result);
      //this.uiservice.loadingStateChanged.next(false);
      //this.store.dispatch({type: 'STOP_LOADING'});
      this.store.dispatch(new UI.StopLoading())
    }).catch(error =>{
      //this.uiservice.loadingStateChanged.next(false);
      //this.store.dispatch({type: 'STOP_LOADING'});
      this.store.dispatch(new UI.StopLoading())

      this.uiservice.showSnackbar(error.message, null, 3000);
      // this.snackbar.open(error.message, null, {
      //   duration: 3000
      // })
    })
  }


  login(authData: AuthData){
    //this.store.dispatch({type: 'START_LOADING'});
    //this.uiservice.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading())
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password).then(result => {
      console.log(result);
      //this.uiservice.loadingStateChanged.next(false);
      //this.store.dispatch({type: 'STOP_LOADING'});
      this.store.dispatch(new UI.StopLoading())
    }).catch(error => {
      //this.uiservice.loadingStateChanged.next(false);
      //this.store.dispatch({type: 'STOP_LOADING'});
      this.store.dispatch(new UI.StopLoading())
      this.uiservice.showSnackbar(error.message, null, 3000);
      // this.snackbar.open(error.message, null, {
      //   duration: 3000
      // })
    })
  }


  logout(){
    this.afAuth.signOut();
  }

/*
Gestito da Redux
  isAuth(){
    return this.isAuthenticated;
  }

  */

}
