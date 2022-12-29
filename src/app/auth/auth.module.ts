import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
    declarations: [SignupComponent, LoginComponent],
    imports: [
     /*
     Importati tramite SharedModule
        CommonModule,
        FormsModule,
        MaterialModule,
    */
        SharedModule,
        ReactiveFormsModule,
        AngularFireAuthModule,
        AuthRoutingModule
    ],
    exports: []
})
export class AuthModule{
    //Ogni modulo funziona in maniera assestante quindi anche se abbiamo messo gli imports in app.module dobbiamo metterli anche qui dentro
}
