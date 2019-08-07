import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.services';
import { TaskService } from '../services/task.services';
import { Task } from '../models/task';

@Component({
    selector: 'default',
    templateUrl: '../views/default.html',
    providers: [UserService, TaskService]
})
export class DefaultComponent implements OnInit {
    public title: string;
    public identity;
    public token;
    public tasks: Array<Task>;
    public pages;
    public pagePrev;
    public pageNext;
    public loading;

    constructor(
        private _route: ActivatedRoute,
        private _router :Router,
        private _userService: UserService,
        private _taskService: TaskService
    ){
        this.title      = 'Homepagos';
        this.identity   = this._userService.getIdentity();
        this.token      = this._userService.getToken();
    }

    ngOnInit(){
        console.log("el componente default ha sido cargado correctamente.");
        this.getAllTasks();
    }

    getAllTasks(){
        this._route.params.forEach((params: Params) => {
            let page = +params['page'];

            if(!page){
                page = 1;
            }
            //peticion tipo ajax
            this.loading = "show";
            this._taskService.getTasks(this.token, page).subscribe(
                response => {
                    console.log(response);
                    if (response.status == 'Success') {
                        this.tasks = response.data;

                        this.loading = "hide";
                        
                        //total de paginas
                        this.pages = [];
                        for (let i = 1; i < response.data.length; i++) {
                            this.pages.push(i);
                        }
                        console.log( this.pages);
                        console.log(JSON.stringify(response.data.length));
                        //pagina anterior
                        if (page >= 2) {
                            this.pagePrev = (page - 1);                    
                        }else{
                            this.pagePrev = page;
                        }
                        //Pagina siguiente
                        if (page < response.total_pages || page == 1) {
                            this.pageNext = (page + 1);                    
                        }else{
                            this.pageNext = page;
                        }
                        //console.log(JSON.stringify(this.tasks));
                    }

                
                },
                error => {
                    console.log(<any>error);
                }
            );
        });
    }
}