import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login.component';
import { RegisterComponent } from './component/register.component';
import { DefaultComponent } from './component/default.component';
import { UserEditComponent } from './component/user.edit.component';
import { TaskNewComponent } from './component/task.new.component';
import { TaskDetailComponent } from './component/task.detail.component';
import { TaskEditComponent } from './component/task.edit.component';

const appRoutes: Routes = [
    { path: '', component: DefaultComponent },
    { path: 'index', component: DefaultComponent },
    { path: 'index/:page', component: DefaultComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/:id', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-edit', component: UserEditComponent },
    { path: 'new-task', component: TaskNewComponent },
    { path: 'task/:id', component: TaskDetailComponent },
    { path: 'task-edit/:id', component: TaskEditComponent },
    { path: '**', component: LoginComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);