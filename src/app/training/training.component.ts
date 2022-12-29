import { Observable, Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from './training.service';

import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit{

  //exerciseSubscription: Subscription;

  constructor(private store: Store<fromTraining.State>, private trainingService:TrainingService){}

  ongoingTraining = false
  ongoingTraining$ : Observable<boolean>

  ngOnInit(){
   /*
   Gestito da Redux adesso
   this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
      if(exercise) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    }) */
    this.ongoingTraining$ = this.store.select(fromTraining.getIsTraining)
  }


  /*
  Con Redux non serve più
  ngOnDestroy() {
    if(this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe();
    }
  } */

}
