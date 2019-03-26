import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'data-grid',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class DataGridComponent implements OnInit{
    @Input() gridOptions = {
        colDef: [],
        rowData: []
    }
    @Output() rowClick = new EventEmitter;

    constructor() {
    }

    ngOnInit() {

    }

    private viewItem(selectedRow) {
        this.rowClick.emit(selectedRow);
    }
}