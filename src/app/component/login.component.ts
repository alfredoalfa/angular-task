import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: '../views/login.html'
})
export class LoginComponent implements OnInit {
    public title: string;

    constructor(
        //private _route: ActivatedRoute,
       // private _router :Router
    ){
        this.title = 'Componente de login';
    }

    ngOnInit(){
        console.log("el componente login ha sido cargado correctamente.")
    }
}