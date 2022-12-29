import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { SharedModule } from "../shared/shared.module";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { StopTrainingComponent } from "./current-training/stop-training.component";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { TrainingRoutingModule } from "./training-routing.module";
import { TrainingComponent } from "./training.component";

import { StoreModule } from "@ngrx/store";
import { trainingReducer } from "./training.reducer";

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent
    ],
    imports:[
        /*
       Importati tramite SharedModule
        CommonModule,
        MaterialModule,
        FormsModule,
        */
        SharedModule,
        TrainingRoutingModule,
        AngularFirestoreModule,
        StoreModule.forFeature('training', trainingReducer)
    ],
    exports:[],
    entryComponents: [StopTrainingComponent]
})
export class TrainingModule{

}
