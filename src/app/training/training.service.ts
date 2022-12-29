import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map, take } from 'rxjs/operators';

import { Subject } from "rxjs";
import { Subscription } from "rxjs";

import { Exercise } from "./exercise.module";
import { Injectable } from "@angular/core";
import { UiService } from "../shared/ui.service";

import { Store } from '@ngrx/store';
import * as UI from '../shared/ui.actions';
//Gestendo con il fromTraining possiamo gestire tutti gli slice e non solo training perchè in training.reducer c'è l'extends verso lo store generico
//import * as fromRoot from '../app.reducer';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions'



@Injectable()
export class TrainingService {


  constructor(private db: AngularFirestore, private uiService: UiService, private store: Store<fromTraining.State>){}


  /* VECCHIO SISTEMA SENZA DATABASE
    private availableExercises: Exercise[] = [
      { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
      { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
      { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
      { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
  */

exerciseChanged = new Subject<Exercise>();
exercisesChanged = new Subject<Exercise[]>();
finishedExercisesChanged = new Subject<Exercise[]>();

private availableExercises : Exercise[];
private runningExercise: Exercise;

private fsSubs: Subscription[] = [];

  fetchAvailableExercises(){
    //this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());

    this.fsSubs.push(this.db.collection('availableExercises').snapshotChanges().pipe(map(docArray => {
      return docArray.map(doc => {
        const data : any = doc.payload.doc.data();
        return {
          //...doc.payload.doc.data() as {},
          id: doc.payload.doc.id,
          duration: data.duration,
          name: data.name,
          calories: data.calories
        }
      })
    })).subscribe((exercises: Exercise[]) => {
      //this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());

      /*
      Gestito da Redux ora
      this.availableExercises = exercises
      this.exercisesChanged.next([...this.availableExercises])*/
      this.store.dispatch(new Training.SetAvailableTrainings(exercises));
    }, error => {
      //this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading());
      this.uiService.showSnackbar('Fetching Exercising failed, please try again later', null, 3000)
      console.log(error);
      this.exercisesChanged.next(null);

    })
    )
  }


  private addDataToDatabase(exercise: Exercise){
    this.db.collection('finishedExercises').add(exercise)
  }


  getAvailableExercises(){
    return this.availableExercises.slice();
  }

  startExercise(selectedId: string){

    //this.db.doc('availableExercises/'+ selectedId).update({lastSelected: [{'nome': 'Sergio', 'cognome': "D'Elia"},{'nome': 'Anna', 'cognome': "D'Addabbo"}]})
    /* Gestito da Redux ora
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({...this.runningExercise});
    */
   this.store.dispatch(new Training.StartTraining(selectedId))
  }

  completeExercise(){

    this.store.select(fromTraining.getActiveTraining).subscribe(ex => {
      this.addDataToDatabase({...ex, date: new Date(), state: 'completed'});

      this.store.dispatch(new Training.StopTraining());
    })


   // this.exercises.push({...this.runningExercise, date: new Date(), state: 'completed'});

    /* Gestito da Redux ora
    this.runningExercise = null;
    this.exerciseChanged.next(null) */

  }

  cancelExercise(progress: number){

    /*this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      state: 'cancelled'
    });*/

    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        state: 'cancelled'});
        this.store.dispatch(new Training.StopTraining());
    })

    /* Gestita da Redux ora
     this.runningExercise = null;
    this.exerciseChanged.next(null) */


  }

  /*
  getRunningExercise(){
    return {...this.runningExercise}
  } */

  fetchCompletedOrCancelledExercises(){
    this.fsSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      // Gestito da Redux ora this.finishedExercisesChanged.next(exercises)
      this.store.dispatch(new Training.SetFinishedTrainings(exercises));
    }, error => {
      console.log(error);
    })
    )
  }

  cancelSubscription(){
    this.fsSubs.forEach(sub => sub.unsubscribe());
  }
}
