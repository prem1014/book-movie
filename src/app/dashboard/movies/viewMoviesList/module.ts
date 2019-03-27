import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DataGridModule } from '../../../_core/widgets/dataGrid/module';
import  { ViewMoviesListComponent } from './component';
import { ModalPopupModule } from '../../../_core/widgets/matDailog/module';
import { BackDropModule } from '../../../_core/widgets/backdrop/module';

import { route } from './route';

@NgModule({
    declarations: [ViewMoviesListComponent],
    imports: [
        CommonModule,
        ModalPopupModule,
        DataGridModule,
        BackDropModule,
        RouterModule.forChild(route)
    ],
    exports: [RouterModule] 
})

export class ViewMoviesListModule {}




