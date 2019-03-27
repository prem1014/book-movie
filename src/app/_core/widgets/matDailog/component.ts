import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { APIService } from '../../../_core/app-service';

@Component({
    selector: 'app-modal-popup',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class ModalPopupComponent implements OnInit {
    public cinemaHallForm: FormGroup;
    public movieForm: FormGroup;
    public cinemaHalls = [];
    public screensDetails: Array<any> = [];
    public templateType;
    public screen: FormArray;
    public loading: boolean = false;
    public isConfirmationPopUp: Boolean = false;
    public toasterConfig = {
        isOpen: false,
        type: 'success',
        message: ''
    }
    constructor(private api: APIService, private fg: FormBuilder, @Inject(MAT_DIALOG_DATA) private data, private dialogRef:MatDialogRef<ModalPopupComponent>) {

    }

    ngOnInit() {
        console.log(this.data);
        if(this.data.type === 'movie') {
            this.templateType = 'movie';
            this.createMovieForm();
        } else {
            this.templateType = 'cinema'
            this.createCinemaForm();
        }
        this.getCinemaHall();
    }

    private createCinemaForm(): void {
        this.cinemaHallForm = this.fg.group({
            hallName: [this.data.hallName, Validators.required],
            city: [this.data.city, Validators.required],
            screen: this.fg.array(this.data.screen.map( item => {
                return this.getScreen(item);
            }))
        });
        this.screen = this.cinemaHallForm.get('screen') as FormArray;
    }

    private getScreen(item): FormGroup {
        return this.fg.group(item);
    }

    private createMovieForm(): void {
        this.movieForm = this.fg.group({
            movieName: [ this.data.movieName, Validators.required ],
            movieDescription: [ this.data.movieDescription, Validators.required ],
            cinemaHallId: [ this.data.cinemaHallId, Validators.required ],
            startDate: [ this.data.startDate, Validators.required ],
            endDate: [ this.data.endDate, Validators.required ],
            screen: [ this.data.screen, Validators.required ]
        });
    }

    private getCinemaHall() {
        this.api.getCinemas()
        .subscribe( (res: any) => {
            this.cinemaHalls = res.data;
            this.screensDetails = this.getScreenByCinemaId(this.data.cinemaHallId);
        });
     }

    private update() {
        console.log(this.cinemaHallForm.value);
        this.loading = true;
        this.api.updateCinemaHallById(this.data._id, this.cinemaHallForm.value)
        .subscribe( (res) => {
            console.log(res);
            this.loading = false;
            this.toasterConfig.isOpen = true;
            this.toasterConfig.message = 'CinemaHall details updated successfully.';
        }, (err) => {
            console.log(err);
            this.loading = false;
            this.displayerErrorMessage(err.message);
        });
    }

    private updateMovie() {
        this.loading = true;
        this.api.updateMovieById(this.data._id, this.movieForm.value)
        .subscribe( res => {
            console.log(res);
            this.loading = false;
            this.toasterConfig.isOpen = true;
            this.toasterConfig.message = 'Movie details updated successfully.';
        }, err => {
            console.log(err)
            this.loading = false;
            this.displayerErrorMessage(err.message);
        });
    }

    public confirmDeleteAction() {
        debugger;
        this.loading = true;
        this.isConfirmationPopUp = true;
    }
    private deleteMovie() {
        this.loading = true;
        this.api.deleteMovie(this.data._id)
        .subscribe( res => {
            console.log(res);
            this.loading = false;
            this.toasterConfig.isOpen = true;
            this.toasterConfig.message = 'Move details deleted successfully.';
        }, err => {
            console.log(err);
            this.loading = false;
            this.displayerErrorMessage(err.message);
        })
    }

    private deleteCinema() {
        this.loading = true;
        this.api.deleteCinema(this.data._id)
        .subscribe( (res) => {
            console.log(res);
            this.loading = false;
            this.toasterConfig.isOpen = true;
            this.toasterConfig.message = 'CinemaHall details deleted successfully.';
        }, (err) => {
            console.log(err);
            this.loading = false;
            this.displayerErrorMessage(err.message);
        });
    }

    public addScreen(index): void {
        this.screen = this.cinemaHallForm.get('screen') as FormArray;
        this.screen.push(this.fg.group({
            screenNo: [1, Validators.required ],
            totalSeats: [0, Validators.required]
        }));
    }

    public deleteScreen(index): void {
        if(this.screen && this.screen.length > 1) {
            this.screen.removeAt(index);
        }
    }

    public getScreenByCinemaId(cinemaId) {
        console.log(cinemaId);
        let cinema = this.cinemaHalls.find( item => item._id === cinemaId)
        return cinema && cinema.screen;
    }

    displayerErrorMessage(message) {
        this.toasterConfig.type = 'error';
        this.toasterConfig.isOpen = true;
        this.toasterConfig.message = message;
    }

    public closeToasrer(ev) {
        this.toasterConfig.isOpen = false;
        this.dialogRef.close({isUpdate: true});
    }

    public confirmNo(data) {
        this.loading = false;
        this.isConfirmationPopUp = false;
    }

    public confirmOk(data) {
        this.loading = false;
        this.isConfirmationPopUp = false;
        if(this.templateType === 'movie') {
            this.deleteMovie();
        } else {
            this.deleteCinema();
        }
    }
}
