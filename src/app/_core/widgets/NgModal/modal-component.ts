import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { StripeToken } from "stripe-angular";

import { APIService } from '../../app-service';

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './component.html',
    providers: [ NgbDatepickerConfig ]
})
export class NgbdModalContentComponent implements OnInit {
    @Input() movie;
    @Input() cinemaHalls;
    private booking: any = {};
    private availableSeat: number = 0;
    private loading: boolean = false;
    private toasterConfig = {
        isOpen: false,
        type: 'success',
        message: ''
    }

    constructor(public activeModal: NgbActiveModal, private api: APIService, private config: NgbDatepickerConfig) {
        let today = new Date();
        config.minDate = {year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate()};
        config.maxDate = {year: 2099, month: 12, day: 31};
    }

    ngOnInit() {

    }

    private bookingDateChanged(ev) {
        let totalSeat = this.getTotalSeat(Number(this.movie.screen), this.movie.cinemaHallId);
        let filter = 'cinemaHallId=' + this.movie.cinemaHallId + '&screen=' + this.movie.screen + '&bookingDate=' + this.booking.bookingDate.day + '-' + this.booking.bookingDate.month + '-' + this.booking.bookingDate.year;
        this.api.getBooking(filter)
            .subscribe((res: any) => {
                console.log(res);
                if (res.data.length > 0) {
                    let bookedSeat = 0;
                    res.data.forEach(item => {
                        bookedSeat = bookedSeat + item.totalSeatsBooked
                    });
                    this.availableSeat = totalSeat - bookedSeat;
                } else {
                    this.availableSeat = totalSeat;
                }
            }, err => {
                console.log(err);
            })

    }

    private getScreenByScreenId(screenId, cinemaId) {
        let cinema = this.getCinemaDetailsById(cinemaId)

        return cinema && cinema.screen.find(item => item.screenNo === screenId).totalSeats;
    }

    private getCinemaDetailsById(id) {
        return this.cinemaHalls.find(item => item._id === id);
    }

    private getTotalSeat(screenId, cinemaId) {
        return this.getScreenByScreenId(screenId, cinemaId);
    }

    private bookMovie(stripeCard) {
        console.log(this.booking);
        let extraData = {
            "name": this.booking.customerName,
            "address_city": "Pune",
            "address_line1": 'Aundh',
            "address_line2": 'ITI',
            "address_state": 'Maharashtra',
            "address_zip": "411057"
        }
        this.loading = true;
        stripeCard.createToken(extraData);
    }

    private closeToasrer(ev) {
        this.toasterConfig.isOpen = false;
    }

    private onSeatSelected() {
        this.booking.amount = Number(this.booking.totalSeatsBooked) * Number(this.movie.rate);
    }

    private onStripeInvalid(error: Error) {
        console.log('Validation Error', error)
        this.loading = false;
        this.toasterConfig.type = 'error';
        this.toasterConfig.isOpen = true;
        this.toasterConfig.message = error.message;
    }

    private setStripeToken(token: StripeToken) {
        console.log('Stripe token', token)
        this.booking = {
            ...this.booking,
            cinemaHallId: this.movie.cinemaHallId,
            cinemaName: this.movie.cinemaName,
            movieName: this.movie.movieName,
            screen: this.movie.screen,
            movieId: this.movie._id,
            city: this.movie.city,
            paymentToken: token,
            _id: 'B_' + this.movie.movieName.replace(/\s/g, "") + Math.floor(Math.random() * 1000)
        }
        this.api.bookMovie(this.booking)
            .subscribe(res => {
                this.loading = false;
                this.toasterConfig.isOpen = true;
                this.toasterConfig.message = 'Your booking has confirmed. Please note your booking id: ' + this.booking._id;
            }, err => {
                console.log(err);
                this.loading = false;
                this.toasterConfig.type = 'error';
                this.toasterConfig.isOpen = true;
                this.toasterConfig.message = err.message;
            })
    }

    private onStripeError(error: Error) {
        console.error('Stripe error', Error)
        this.loading = false;
        this.toasterConfig.type = 'error';
        this.toasterConfig.isOpen = true;
        this.toasterConfig.message = error.message;
    }

}
