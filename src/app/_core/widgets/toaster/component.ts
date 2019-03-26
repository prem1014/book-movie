import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';
  
@Component({
    selector: 'app-toaster',
    animations: [
        trigger('openClose', [
            state('open', style({
                opacity: 1,
                minWidth: '350px',
                maxWidth: '400px'
            })),
            state('closed', style({
                opacity: 0,
                minWidth: '0px',
                maxWidth: '0px'
            })),
            transition('open => closed', [
                animate('600ms ease-out')
              ]),
              transition('closed => open', [
                animate('1000ms ease-in')
              ]),
        ])
    ],
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class ToasterComponent implements OnInit{
    @Input() bottom: string ;
    @Input() config = {
        isOpen: false,
        type: 'success',
        message: ''
    }
    @Output() closeToasrer = new EventEmitter
    constructor() {
        
    }

    ngOnInit() {
        console.log('toaster');
        console.log(this.bottom)
    }

    public close() {
        this.closeToasrer.emit('toaster close event raised');
    }
}