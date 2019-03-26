import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { APIService } from '../../_core/app-service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class SignInComponent implements OnInit {
    public signInForm: FormGroup;
    public loading: boolean = false;
    public toasterConfig = {
        isOpen: false,
        type: 'success',
        message: ''
    };
    constructor(private fb: FormBuilder, private router: Router, private api: APIService) {
        console.log('SigninComponent');
        this.cretaeSignInForm();
    }

    ngOnInit() {

    }

    public signIn() {
        console.log(this.signInForm);
        this.loading = true;
        this.api.logIn(this.signInForm.value)
        .subscribe( (data: any) => {
            this.loading = false;
            if(data.token) {
                let user = {
                    ...data.user,
                    token: data.token,
                    isAthenticated: data.isAthenticated
                }
                sessionStorage.setItem('user', JSON.stringify(user));
                this.api.saveUserInfo(user);
                this.router.navigateByUrl('dashboard');
            } else if(data.errorCode) {
                this.showErrorMessage(data.message);
            }
        }, (err) => {
            console.log(err);
            this.loading = false;
            this.showErrorMessage(err.message);
        })
    }

    private cretaeSignInForm(): void {
        this.signInForm = this.fb.group({
            _id: ['', Validators.required ],
            password: ['', Validators.required]
        })
    }

    private showErrorMessage(message) {
        this.toasterConfig.type = 'error';
        this.toasterConfig.message = message;
        this.toasterConfig.isOpen = true;
    }

    public closeToasrer(ev) {
        this.toasterConfig.isOpen = false;
    }
}