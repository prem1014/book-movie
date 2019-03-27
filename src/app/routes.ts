import { Routes } from '@angular/router';
import { AppAuthGuard } from './_core/auth-guard';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: 'src/app/home/module#HomeModule'
    },
    {
        path: 'dashboard',
        loadChildren: 'src/app/dashboard/module#DashboardModule',
        canActivate: [AppAuthGuard]
    },
    {
        path: 'book-movie',
        loadChildren: 'src/app/book-movie/module#BookMovieModule'
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

