import { Routes } from '@angular/router';
import { AppAuthGuard } from './_core/auth-guard';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: 'src/app/home/module#HomeModule'
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

