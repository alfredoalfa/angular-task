import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.services';
import { TaskService } from '../services/task.services';
import { Task } from '../models/task';

@Component({
    selector: 'task-new',
    templateUrl: '../views/task.new.html',
    providers: [UserService, TaskService]
})
export class TaskNewComponent implements OnInit {
    public page_title: string;
    public identity;
    public token;
    public task: Task
    public status_task;

    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _taskService: TaskService
    ){
        
        this.page_title = 'Nueva tarea';
        this.identity   = this._userService.getIdentity();
        this.token      = this._userService.getToken();
    }

    ngOnInit(){
        if (this.identity == null && !this.identity.id) {
            this._router.navigate(['/login']);            
        
        } else {
            this.task = new Task(1, "", "", "new", "null", "null");           
        }

        //console.log(this._taskService.create());
    }

    onSubmit(){
        this._taskService.create(this.token,this.task).subscribe(
            response => {
                this.status_task = response.status;
// console.log(this.status_task);
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
    }

}