import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialModule} from './material.module';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component'
import { StopTrainingComponent } from './training/current-training/stop-training.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore'
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';

/* npm i --save @ngrrx/store */
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer'

@NgModule({
  declarations: [
    AppComponent,
  /*
  Importati tramite AuthModule
    LoginComponent,
    SignUpComponent,
  Importati tramite TrainingModule
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent, */
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    //StoreModule.forRoot({ ui: appReducer }),
    StoreModule.forRoot(reducers),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    /*
    Messo in AuthModule
    AngularFireAuthModule, */
    /*
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
    */
    AuthModule,
    /*
    Importato in maniera LazyLoading in App-Routing Module
    TrainingModule
    */
  ],
  providers: [AuthService, TrainingService],
  bootstrap: [AppComponent],
  /*
  Spostato in TrainingModule
  entryComponents: [StopTrainingComponent] */
})
export class AppModule {
 }


