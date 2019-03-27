import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NgbdModalContentComponent } from './_core/widgets/NgModal/modal-component';
import { Module as StripeModule } from "stripe-angular";

import { BackDropModule } from './_core/widgets/backdrop/module';
import { ToasterModule } from './_core/widgets/toaster/module';

import { AppComponent } from './app.component';
import { routes } from './routes';
import { APIService } from './_core/app-service';

@NgModule({
  declarations: [
    AppComponent,
    NgbdModalContentComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BackDropModule,
    ToasterModule,
    NgbModule.forRoot(),
    StripeModule.forRoot(),
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [APIService],
  entryComponents: [NgbdModalContentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
