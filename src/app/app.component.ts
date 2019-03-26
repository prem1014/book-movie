import { Component } from '@angular/core';
import { StripeScriptTag } from "stripe-angular";

import { APIService } from './_core/app-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private userInfo: User = {
    name: '',
    role: '',
    isAthenticated: false
  };
  private publishableKey: string = 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa';

  constructor(private api: APIService, public stripeScriptTag: StripeScriptTag) {
    console.log(this.userInfo);
    this.stripeScriptTag.setPublishableKey(this.publishableKey)
  }

  ngOnInit() {
    if (JSON.parse(sessionStorage.getItem('user'))) {
      this.userInfo = JSON.parse(sessionStorage.getItem('user'));
    }
    this.api.signSuccess$.subscribe((user) => {
      this.userInfo = user;
    })
  }

  private logout(ev) {
    ev.preventDefault();
    this.userInfo.isAthenticated = false;
    this.userInfo.name = '';
    this.userInfo.role = '';
    sessionStorage.setItem('user', JSON.stringify(this.userInfo));
  }
}

interface User {
  name: string;
  role: string;
  isAthenticated: boolean;
}