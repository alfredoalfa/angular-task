import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.services'; 

@Component({
    selector: 'login',
    templateUrl: '../views/login.html',
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    public title: string;
    public user;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _UserService: UserService
    ){
        this.title = 'Identificate';
        this.user = {
            "email":"",
            "password":"",
            "gethash": "false"
        };
    }

    ngOnInit(){
        console.log("el componente login ha sido cargado correctamente.")
    }

    onSubmit(){
        console.log(this.user);
        alert(this._UserService.signup());
    }
}