import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // @ViewChild('sidenav') sidenav:any;
  title = 'corso-udemy';

  /*onToggle(){
    this.sidenav.toggle();
  }*/

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.authService.initAuthListener();
  }

}
