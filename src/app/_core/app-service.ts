import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()

export class APIService {
    private API_URL = 'http://localhost:9000/api/';
    private tokenVaildDuration = 5 * 60;
    private tokenExpiry = Math.floor(Date.now() / 1000) + (this.tokenVaildDuration * 60)
    public user = new Subject<any>();
    public signSuccess$ = this.user.asObservable();
    constructor(private http: HttpClient) {

    }

    public getAllMovies() {
        return this.http.get(this.API_URL + 'movies');
    }

    public saveMovie(addMovie) {
        return this.http.post(this.API_URL + 'movies', addMovie);
    }

    public updateMovieById(id, movie) {
        return this.http.put(this.API_URL + 'movies/' + id, movie);
    }

    public deleteMovie(id) {
        return this.http.delete(this.API_URL + 'movies/' + id);
    }

    public addCinema(cinema) {
        return this.http.post(this.API_URL + 'cinema', cinema);
    }

    public getCinemas() {
        return this.http.get(this.API_URL + 'cinema');
    }

    public updateCinemaHallById(id, cinemaHall) {
        return this.http.put(this.API_URL + 'cinema/' + id, cinemaHall);
    }

    public deleteCinema(id) {
        return this.http.delete(this.API_URL + 'cinema/' + id);
    }

    public bookMovie(bookingDetails) {
        return this.http.post(this.API_URL + 'booking', bookingDetails);
    }

    public getBooking(filter) {
        if(filter) {
            return this.http.get(this.API_URL + 'booking?' + filter);
        } else {
            return this.http.get(this.API_URL + 'booking');
        }
    }

    public deleteBooking(id) {
        return this.http.delete(this.API_URL + 'booking/' + id);
    }

    public logIn(user) {
        return this.http.post(this.API_URL + 'login', { user : { ...user, tokenExpiry: this.tokenExpiry }});
    }

    public saveUserInfo(user) {
        this.user.next(user);
    }

}
