import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.services';
import { TaskService } from '../services/task.services';
import { Task } from '../models/task';

@Component({
    selector: 'task-edit',
    templateUrl: '../views/task.edit.html',
    providers: [UserService, TaskService]
})
export class TaskEditComponent implements OnInit {
    public page_title: string;
    public identity;
    public token;
    public task: Task;
    public status_task;
    public loading;

    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _taskService: TaskService
    ){
        
        this.page_title = 'Editar tarea';
        this.identity   = this._userService.getIdentity();
        this.token      = this._userService.getToken();
    }

    ngOnInit(){
        
        if (this.identity == null && !this.identity.id) {
            this._router.navigate(['/login']);            
        
        } else {
            //this.task = new Task(1, "", "", "new", "null", "null");    
            this.getTask();     
        }

        //console.log(this._taskService.create());
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
                            this.task = response.data;
                            console.log(response.data.id);
                            
                            console.log(this.task);
                            this.loading = 'hide';
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

    onSubmit(){
        this._route.params.forEach((params:Params) => {
            let id = +params['id'];
            
            this._taskService.update(this.token, this.task, id).subscribe(
                response => {
                    this.status_task = response.status;
                        if (this.status_task != 'Success') {
                                this.status_task = 'error';
                        } else {
                            this.status_task = response.status;
                            //this._router.navigate(['/task', this.task.id]);
                            this._router.navigate(['/']);
                        }

                },
                error => {
                    console.log(<any> error);
                }
            );
        }); 
    }

}