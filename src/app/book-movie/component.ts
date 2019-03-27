import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { APIService } from '../_core/app-service';
import { NgbdModalContentComponent} from '../_core/widgets/NgModal/modal-component';

@Component({
    selector: 'app-book-movie',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class BookMovieComponent implements OnInit {
    private movies: Array<any> = [];
    private cinemaHalls: Array<any> = [];
    private loading: boolean = false;
    constructor(private api: APIService, private modalService: NgbModal){
        
    }

    ngOnInit() {
        this.getAllMovies();
    }

    private getAllMovies() {
        console.log('reached here');
        this.loading = true;
        this.api.getAllMovies()
            .subscribe(
                (response: any) => {
                    console.log(response);
                    if (response.data.success) {
                        this.movies = response.data.list;
                        console.log(this.movies);
                        this.getAllCinemaHalls()
                    } else {
                    }
                },
                (err: any) => {
                    this.loading = false;
                }
            );
    }

    private getAllCinemaHalls() {
        this.api.getCinemas()
            .subscribe((res: any) => {
                this.loading = false;
                this.cinemaHalls = res.data;
                this.movies = this.movies.map( item => {
                    let moviHall = this.cinemaHalls.find( a => a._id === item.cinemaHallId)
                    item.cinemaName = moviHall.hallName;
                    item.city = moviHall.city;
                    item.rate = moviHall.screen.find(a => Number(a.screenNo) === Number(item.screen)).rate;
                    return item;
                })
            }, (err) => {
                console.log(err);
                this.loading = false;
            });
    }

    getScreenDetails(screen) {

    }

    private bookMovie(movie) {
        const modalRef = this.modalService.open(NgbdModalContentComponent, { size: 'lg'});
        modalRef.componentInstance.movie = movie;
        modalRef.componentInstance.cinemaHalls = this.cinemaHalls;
    }
}