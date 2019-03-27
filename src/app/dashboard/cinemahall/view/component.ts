import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';

import { ModalPopupComponent } from '../../../_core/widgets/matDailog/component';
import { APIService } from '../../../_core/app-service';

@Component({
    selector: 'app-viewmovielist',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class ViewCinemaHallComponent implements OnInit {
    public cinemaHalls = [];
    public selectedRow;
    private dialogConfig;
    public loading: boolean = false;
    public gridOptions = {
        colDef: [],
        rowData: [],
        action: 'edit'
    }
    constructor(private dialog: MatDialog, private api: APIService) {

        this.dialogConfig = new MatDialogConfig();
        this.gridOptions.colDef = [
            {
                field: '_id',
                headerName: 'Id'
            },
            {
                field: 'hallName',
                headerName: 'Name'
            }, {
                field: 'city',
                headerName: 'City'
            }
        ]
        this.dialogConfig.width = '700px';
    }
    ngOnInit() {
        this.getAllCinemaByAdminId();
    }

    private getAllCinemaByAdminId() {
        this.loading = true;
        this.api.getCinemas()
            .subscribe((res: any) => {
                this.cinemaHalls = res.data;
                this.cinemaHalls = this.cinemaHalls.map(item => {
                    item.type = 'cinema';
                    return item;
                });
                this.gridOptions.rowData = this.cinemaHalls
                this.loading = false;
            }, (err) => {
                console.log(err);
                this.loading = false;
            });
    }

    public onRowSelected(evt) {
        console.log(evt);
        this.dialogConfig.data = evt;
        const dialogRef = this.dialog.open(ModalPopupComponent, this.dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed' + result);
            if(result.isUpdate) {
                this.getAllCinemaByAdminId();
            }
        });
    }
}
