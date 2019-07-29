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
//Usar el constructor para la inyección de dependencias e inicialización simple de variables.
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Identificate';
        this.user  = {
            "email":"luis@gmail.com",
            "password":"123456",
            "getHash": "false"
        };
        console.log("ya se armo el constructor ");
    }
   //Usar el método ngOnInit para inicialización compleja y obtener valores de las propiedades tipo Input.
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
        let identity = this._userService.getIdentity();
        if ( identity != null && identity.id) {
            this._router.navigate(['/']);
                        
        }
    }

    onSubmit(){ //realiza el login 
        console.log(this.user);

        this._userService.signup(this.user).subscribe(
            response => { 
                this.identity = response;

                if (this.identity.length <= 1) {
                        console.log("Error en el servicio");
                }{ 
                    if (!this.identity.status) {
                        localStorage.setItem('identity', JSON.stringify(this.identity));
                        
                        // GET TOKEN
                        this.user.getHash = null;
                        this._userService.signup(this.user).subscribe(
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