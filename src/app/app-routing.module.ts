import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  /*
  Importati tramite AuthModule
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  */
  {path: '', component: WelcomeComponent},
  /*
 Importato tramite TrainingModule in maniera LazyLoading
  {path: 'training', component: TrainingComponent, canActivate: [AuthGuard]}
  */

  /* Si imposta il path e poi loadChildren con una callback che importa il module e poi elemento. nome della Classe del module
    Al posto di usare canActivate: [AuthGuard] useremo quindi canLoad aggiungendo ad AuthGuard il metodo canLoad
  */
  {path: 'training', loadChildren: () => import('./training/training.module').then(x => x.TrainingModule), canLoad: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
