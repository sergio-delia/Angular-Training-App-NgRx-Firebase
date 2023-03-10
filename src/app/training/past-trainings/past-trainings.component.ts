import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.module';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit{

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];

  dataSource = new MatTableDataSource<Exercise>();

  //private exChangedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   *
   * Per aggiungere l'ordinamento ricordati di aggiungere a material MatSortModule
   */

  constructor(private trainingService: TrainingService, private store:Store<fromTraining.State>){}

  ngOnInit(){
    //this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();

    this.store.select(fromTraining.getFinishedExercises).subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises
      //console.log(this.dataSource.data);

    })
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator
  }

  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

/*  ngOnDestroy(): void {
    if(this.exChangedSubscription){
      this.exChangedSubscription.unsubscribe();
    }
  }
*/
}
