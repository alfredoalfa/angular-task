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
    public identity;
    public token;

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
        console.log("el componente login ha sido cargado correctamente.");
        console.log(JSON.parse(localStorage.getItem('identity')));
    }

    onSubmit(){
        console.log(this.user);
        this._UserService.signup(this.user).subscribe(
            response => { 
                this.identity = response;

                if (this.identity.length <= 1) {
                        console.log("Error en el servicio");
                }{
                    if (!this.identity.status) {
                        localStorage.setItem('identity', JSON.stringify(this.identity));                        
                    }
                }

            },
            error =>{
                console.log(<any>error);
            }
        );
    }
}