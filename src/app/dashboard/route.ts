import { Routes } from '@angular/router';
import { DashboardComponent } from './component';
export const route: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: 'add-cinema',
                loadChildren: 'src/app/dashboard/cinemahall/add/module#AddCinemaHallModule'
            },
            {
                path: 'view-cinema',
                loadChildren: 'src/app/dashboard/cinemahall/view/module#ViewCinemaHallModule'
            },
            {
                path: 'view-movie',
                loadChildren: 'src/app/dashboard/movies/viewMoviesList/module#ViewMoviesListModule'
            },
            {
                path: 'add-movie',
                loadChildren: 'src/app/dashboard/movies/addMovie/module#AddMovieModule'
            }
        ]
    }
];

