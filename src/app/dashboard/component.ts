import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as Highcharts from 'highcharts';

import { APIService } from './../_core/app-service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class DashboardComponent implements OnInit {
    public booking: any = {
        total: [],
        today: [],
        tomorrow: []
    };
    public gridOptions = {
        colDef: [],
        rowData: [],
        action: 'delete'
    };
    public toasterConfig = {
        isOpen: false,
        type: 'success',
        message: ''
    }
    public loading: boolean = false;
    public isConfirmationPopUp: boolean = false;
    public selectedRow: any;
    public Highcharts = Highcharts;
    public chartOptions = {
        series: [],
        chart: {
            type: 'column'
        },
        title: {
            text: 'Top 5 Movies'
        },
        xAxis: {
            categories: [
                'Movies'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Booking'
            }
        },
    };
    constructor(private api: APIService, public activatedRute: ActivatedRoute, private modalService: NgbModal) {
        this.gridOptions.colDef.push(
            { headerName: 'Name', field: 'movieName' },
            { headerName: 'Booked By', field: 'customerName' },
            { headerName: 'City', field: 'city' },
            { headerName: 'Screen', field: 'screen' },
            { headerName: 'Total Amount', field: 'amount' }
        )
    }
    ngOnInit() {
        this.getBooking();
    }

    private getBooking() {
        this.loading = true;
        this.api.getBooking(null)
            .subscribe((res: any) => {
                console.log(res);
                this.loading = false;
                let todayDate = new Date();
                let tomorrowDate = new Date(todayDate);
                tomorrowDate.setDate(todayDate.getDate() + 1);
                this.booking.total = res.data;
                this.booking.today = this.getBookingByDate(res.data, todayDate);
                this.booking.tomorrow = this.getBookingByDate(res.data, tomorrowDate);
                if (this.selectedRow) {
                    this.itemSelected('total');
                }
                this.chartOptions.series = this.createDataForTop5Movie();
            }, err => {
                this.loading = false;
            })
    }

    private getBookingByDate(data, date) {
        return data.map(item => {
            let todayMonth = date.getMonth();
            let todayDay = date.getDate();
            let todayYear = date.getFullYear();
            let bookingDate = new Date(item.bookingDate)
            let bookingMonth = bookingDate.getMonth();
            let bookingDay = bookingDate.getDate();
            let bookingYear = bookingDate.getFullYear();
            if (todayYear === bookingYear && todayMonth === bookingMonth && todayDay === bookingDay) {
                return item;
            }
        }).filter(el => el);
    }

    private itemSelected(type) {
        switch (type) {
            case 'total':
                this.gridOptions.rowData = this.booking.total;
                break;
            case 'today':
                this.gridOptions.rowData = this.booking.today;
                break;
            case 'tomorrow':
                this.gridOptions.rowData = this.booking.tomorrow;
                break;
            default:
                break;
        }
    }

    private onRowSelected(data) {
        this.loading = true;
        this.isConfirmationPopUp = true;
        this.selectedRow = data;
    }

    private deleteBooking() {
        this.loading = true;
        this.api.deleteBooking(this.selectedRow._id)
            .subscribe((res: any) => {
                this.toasterConfig.isOpen = true;
                this.toasterConfig.message = 'Booking detaila deleted successfully.'
                this.loading = false
            }, (err: Error) => {
                this.loading = false;
                this.toasterConfig.isOpen = true;
                this.toasterConfig.type = 'error'
                this.toasterConfig.message = err.message;
            })
    }

    private confirmNo(data) {
        this.loading = false;
        this.isConfirmationPopUp = false;
    }

    private confirmOk(data) {
        this.loading = false;
        this.isConfirmationPopUp = false;
        this.deleteBooking()
    }

    public closeToasrer(ev) {
        this.toasterConfig.isOpen = false;
        this.getBooking();
    }

    private getTotalBookingByMovieName(movieId) {
        let sum = 0;
        this.booking.total.map( item => {
            if(item.movieId === movieId) {
                sum = sum + item.totalSeatsBooked
            }
        });
        return sum;
    }

    private createDataForTop5Movie() {
        let series = [];
        let movieId = []
        let movieName = [];
        this.booking.total.map( i => {
            if(movieId.length > 0 && movieId.indexOf(i.movieId) === -1) {
                movieId.push(i.movieId);
                movieName.push({
                    name: i.movieName,
                    id: i.movieId
                })
            } else if(movieId.length === 0){
                movieId.push(i.movieId);
                movieName.push({
                    name: i.movieName,
                    id: i.movieId
                })
            }

        });

        movieId.forEach(item => {
            series.push({
                name: movieName.find( i => i.id === item).name,
                data: [this.getTotalBookingByMovieName(item)]
            })
        });
        return series;
    }
}
