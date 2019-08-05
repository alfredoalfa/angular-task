import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class TaskService{
    public url: String;

    constructor(
        private _http: Http
    ){
        this.url = GLOBAL.url;
    }

    create(token, task){
        let json = JSON.stringify(task);
        let params = "json="+json+'&autorization='+token;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

        return this._http.post(this.url+'/task/new', params, {headers: headers})
                            .map(res => res.json());
    }
}