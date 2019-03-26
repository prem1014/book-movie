import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-backdrop',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class BackDropComponent {
    @Input() isOpen: Boolean = false;
    @Input() isConfirmationPopUp: Boolean = false;
    @Output() confirmOk = new EventEmitter();
    @Output() confirmNo = new EventEmitter();

    constructor() {
        console.log(this.isOpen)
    }

    private ok(ev) {
        this.confirmOk.emit(ev);
    }

    private cancel(ev) {
        this.confirmNo.emit(ev);
    }
}