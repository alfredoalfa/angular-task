import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.services';
import { Task } from '../models/task';

@Component({
    selector: 'task-new',
    templateUrl: '../views/task.new.html',
    providers: [UserService]
})
export class TaskNewComponent implements OnInit {
    public page_title: string;
    public identity;
    public task: Task

    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        
        this.page_title = 'Nueva tarea';
        this.identity = this._userService.getIdentity();
    }

    ngOnInit(){
        if (this.identity == null && !this.identity.id) {
            this._router.navigate(['/login']);            
        
        } else {
            this.task = new Task(1, "", "", "new", "null", "null");           
        }
    }

    onSubmit(){
        console.log(this.task);
    }

}