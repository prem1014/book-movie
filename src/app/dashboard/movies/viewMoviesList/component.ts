import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalPopupComponent } from '../../../_core/widgets/matDailog/component';
import { APIService } from '../../../_core/app-service';

@Component({
    selector: 'app-viewmovielist',
    templateUrl: './component.html',
    styleUrls: ['./component.scss']
})

export class ViewMoviesListComponent implements OnInit {
    private dialogConfig;
    private viewMovieList = [];
    public gridOptions = {
        colDef: [],
        rowData: [],
        action: 'edit'
    };
    public loading: boolean = false;
    constructor(private api: APIService, private dialog: MatDialog) {
        this.dialogConfig = new MatDialogConfig();
        this.dialogConfig.width = '900px';
        this.gridOptions.colDef = [
            { headerName: 'Name', field: 'movieName' },
            { headerName: 'Description', field: 'movieDescription' },
            { headerName: 'Screen', field: 'screen' }
        ];
    }
    ngOnInit() {
        this.getAllMovies();
    }

    private getAllMovies() {
        this.loading = true;
        this.api.getAllMovies()
            .subscribe(
                (response: any) => {
                    console.log(response);
                    if (response.data.success) {
                        this.viewMovieList = response.data.list;
                        this.viewMovieList = this.viewMovieList.map(item => {
                            item.type = 'movie';
                            return item;
                        });
                        this.gridOptions.rowData = this.viewMovieList;
                        this.loading = false;
                    } else {
                    }
                },
                (err: any) => {
                    this.loading = false;
                }
            );
    }

    public onRowSelected(evt) {
        console.log(evt);
        this.dialogConfig.data = evt;
        const dialogRef = this.dialog.open(ModalPopupComponent, this.dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if(result.isUpdate) {
                this.getAllMovies();
            }
        });
    }
}
