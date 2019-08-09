import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.services'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  public title = 'Task';
  public identity;
  public token;

    constructor(
      private _UserService: UserService
  ){
      this.identity = this._UserService.getIdentity();
      this.token    = this._UserService.getToken();
  }


      ngOnInit(){
            // console.log("2el componente login ha sido cargado correctamente.");
            // console.log(this._UserService.getIdentity());
            // console.log("2el componente login ha sido cargado correctamente.");
            // console.log(this._UserService.getToken());
      }
}


