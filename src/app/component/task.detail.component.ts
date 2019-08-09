import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.services'; 
import { TaskService } from '../services/task.services';
import { Task } from '../models/task';


@Component({
    selector: 'task-detail',
    templateUrl: '../views/task.detail.html',
    providers: [UserService, TaskService]
})

export class TaskDetailComponent  implements OnInit{
    public identity;
    public token;
    public task_edit: Task;
    public loading;

    constructor(
        private _userService: UserService,
        private _taskService: TaskService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken(); 
    }


    ngOnInit(){
        if (this.identity && this.identity.id) {
            //llama al servicio de tareas para sacar una tarea
            //llama al metodo de este componente
            this.getTask();
            

        } else {
            console.log(this.identity);
            //this._router.navigate(['/login']);
        }
    }

    getTask(){
        this.loading = 'show';
        this._route.params.forEach((params:Params) => {
            let id = +params['id']; // con el + convertimos el array en un entero.

            this._taskService.getTask(this.token, id).subscribe(
                response => {
                   
                    if (response.status == 'Success') {
                        
                        if (response.data.user.id == this.identity.id) {
                            //PODEMOS VER LA TAREA
                            this.loading = 'hide';
                            this.task_edit = response.data;

                        } else {
                            this._router.navigate(['/']);
                        }

                    } else {
                        this._router.navigate(['/login']);
                    }
                },
                error => {
                    console.log(<any>error);
                }
            );
        });
    }
}