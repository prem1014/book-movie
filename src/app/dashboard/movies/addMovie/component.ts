import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AddMovie } from './add-movie.model';
import { APIService } from '../../../_core/app-service';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-addmovie',
    templateUrl: './component.html',
    styleUrls: ['./component.scss'],
    providers: [NgbDatepickerConfig]
})

export class AddMovieComponent implements OnInit {
    public movie = new AddMovie();
    public cinemaHalls: any = [];
    public screens: Array<any> = [];
    public loading: boolean = false;
    public toasterConfig = {
        isOpen: false,
        type: 'success',
        message: ''
    }
    @ViewChild('addMovies') addMovies;

    constructor(private apiService: APIService, private route: Router, private config: NgbDatepickerConfig) {
        this.movie.cinemaHalls = []
        let today = new Date();
        config.minDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
        config.maxDate = { year: 2099, month: 12, day: 31 };
    }

    ngOnInit() {
        this.getCinemaHall();
    }

    public saveMovie() {
        this.movie._id = 'M' + Math.floor(Math.random() * 1000);
        this.loading = true;
        this.apiService.saveMovie(this.movie).subscribe(
            (data: any) => {
                this.loading = false;
                this.toasterConfig.isOpen = true;
                this.toasterConfig.message = 'Movie details saved successfully';
            },
            (error: any) => {
                this.loading = false;
                this.toasterConfig.isOpen = true;
                this.toasterConfig.type = 'error';
                this.toasterConfig.message = error.message;
            }
        );
    }

    private getCinemaHall() {
        this.apiService.getCinemas()
            .subscribe((res: any) => {
                this.cinemaHalls = res.data;
            });
    }

    public onCinemaSelected(cinemaId) {
        console.log(cinemaId);
        let cinema = this.cinemaHalls.find(item => item._id === cinemaId)
        this.screens = cinema && cinema.screen;
    }

    public closeToasrer(ev) {
        this.toasterConfig.isOpen = false;
        this.route.navigateByUrl('dashboard');
    }
}
