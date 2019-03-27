import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { APIService } from '../../../_core/app-service';

@Component({
    selector: 'app-add-cinema',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class AddCinemaHallComponent implements OnInit {
    public cinemaHallForm: FormGroup;
    public screen: FormArray;
    public loading: boolean = false;
    public toasterConfig = {
        isOpen: false,
        type: 'success',
        message: ''
    };
    constructor(private fg: FormBuilder, private api: APIService, private modal: NgbModal, private route: Router) {
        this.createCinemaForm();
    }
    ngOnInit() {
    }

    private createCinemaForm(): void {
        this.cinemaHallForm = this.fg.group({
            hallName: ['', Validators.required],
            city: ['', Validators.required],
            screen: this.fg.array([this.createItem()])
        });
        this.screen = this.cinemaHallForm.get('screen') as FormArray;
    }

    private createItem(): FormGroup {
        return this.fg.group({
            screenNo: [1, Validators.required ],
            totalSeats: [0, Validators.required],
            rate: [0, Validators.required]
        });
    }

    public addScreen(index): void {
        this.screen = this.cinemaHallForm.get('screen') as FormArray;
        this.screen.push(this.createItem());
    }

    public deleteScreen(index): void {
        if(this.screen && this.screen.length > 1) {
            this.screen.removeAt(index);
        }
    }

    public save(): void {
        console.log(this.cinemaHallForm);
        this.cinemaHallForm.value._id = 'CIN' + Math.floor(Math.random() * 1000);
        this.loading = true;
        this.toasterConfig.isOpen =true;
        this.api.addCinema(this.cinemaHallForm.value)
            .subscribe((res) => {
                console.log(res);
                this.loading = false;
                this.toasterConfig.message = 'CinemaHall details saved successfully.';
            }, (err) => {
                console.log(err);
                this.loading = false;
                this.toasterConfig.type = 'error';
                this.toasterConfig.message = 'Some thing went wrong';
            });
    }

    public closeToasrer(ev) {
        this.toasterConfig.isOpen = false;
        this.route.navigateByUrl('dashboard');
    }
}
