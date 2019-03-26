import { Routes } from '@angular/router';
import { AppAuthGuard } from './_core/auth-guard';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: 'src/app/home/module#HomeModule'
    },
    {
        path: 'sign-in',
        loadChildren: 'src/app/user/sign-in/module#SignInModule'
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

