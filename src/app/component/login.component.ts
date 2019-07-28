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
        this.user  = {
            "email":"wilderr@gmail.com",
            "password":"123456",
            "getHash": "false"
        };
        console.log("ya se armo el constructor ");
    }
   
    ngOnInit(){
        console.log("el componente login ha sido cargado correctamente.");
        this.logout();
        this.redirectIfIdentity();
    }

    logout(){ //se recogen los parametros de la url activa y si esta encuentra el numero 1 entonces se cumple la condición.
        console.log('cargar el escaneo de la ruta activa');
        this._route.params.forEach((params: Params) => {
            let logout = +params['id']; //se combierte a numero agregardo el +
            if ( logout == 1 ) {
                localStorage.removeItem('identity');
                localStorage.removeItem('token');

                this.identity = null;
                this.token    = null;
                
                window.location.href = '/login';
            }
        });
    }

    redirectIfIdentity(){ //hace un redirect si la persona esta logeada y no puede acceder a la ruta login
        let identity = this._UserService.getIdentity();
        if ( identity != null && identity.id) {
            this._router.navigate(['/']);
                        
        }
    }

    onSubmit(){ //realiza el login 
        console.log(this.user);

        this._UserService.signup(this.user).subscribe(
            response => { 
                this.identity = response;

                if (this.identity.length <= 1) {
                        console.log("Error en el servicio");
                }{ 
                    if (!this.identity.status) {
                        localStorage.setItem('identity', JSON.stringify(this.identity));
                        
                        // GET TOKEN
                        this.user.getHash = null;
                        this._UserService.signup(this.user).subscribe(
                            response => { 
                                this.token = response;
                
                                if (this.identity.length <= 1) {
                                        console.log("Error en el servicio");
                                }{
                                    if (!this.identity.status) {
                                        localStorage.setItem('token', JSON.stringify(this.token));                        
                                    
                                        window.location.href = '/';
                                    }
                                }
                
                            },
                            error =>{
                                console.log(<any>error);
                            }
                        );
                    }
                }

            },
            error =>{
                console.log(<any>error);
            }
        );
    }
}