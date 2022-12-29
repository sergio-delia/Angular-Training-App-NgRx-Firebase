import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.module';
import { TrainingService } from '../training.service';


//import { map } from 'rxjs/operators'

import { map } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable, Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';


import { Store } from '@ngrx/store';
//import * as fromApp from '../../app.reducer';
/* Importiamo da fromTraining perchè questo fa l'extends di app.reducer */
import * as fromTraining from '../training.reducer'
import * as fromRoot from '../../app.reducer'
import * as UI from '../../shared/ui.actions';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit{

  constructor(private trainingService: TrainingService, private db: AngularFirestore, private uiService: UiService, private store: Store<fromTraining.State>){}

  exerciseSubscription: Subscription;
  private loadingSubscription: Subscription;
  //exercises: Exercise[]
  //isLoading = true;
  exercises$: Observable<Exercise[]>
  isLoading$: Observable<boolean>;

  ngOnInit() {

    //this.exercises = this.trainingService.getAvailableExercises();


    /**
     this.exercises = this.db.collection('availableExercises').valueChanges();
     * VALUECHANGES mostra solo i dati mentre SNAPSHOPCHANGES con tutto il metodo di soto mostra anche l'id del dato
     */

    /*this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })*/

    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    /* this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {

      this.exercises = exercises;

    }) */
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises)
    this.fetchExercises();

  }

  fetchExercises(){
    this.trainingService.fetchAvailableExercises();
  }



  onStartTraining(form: NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }

  /* ngOnDestroy() {
    if(this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe();
    }
    if(this.loadingSubscription){
      this.loadingSubscription.unsubscribe();
    }
  } */

}
