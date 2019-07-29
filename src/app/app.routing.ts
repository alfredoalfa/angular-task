import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login.component';
import { RegisterComponent } from './component/register.component';
import { DefaultComponent } from './component/default.component';
import { UserEditComponent } from './component/user.edit.component';
import { TaskNewComponent } from './component/task.new.component';

const appRoutes: Routes = [
    { path: '', component: DefaultComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/:id', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-edit', component: UserEditComponent },
    { path: 'new-task', component: TaskNewComponent },
    { path: '**', component: LoginComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);