import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ViewCinemaHallComponent } from './component';
import { ModalPopupModule } from '../../../_core/widgets/matDailog/module';
import { route } from './route';
import { DataGridModule } from '../../../_core/widgets/dataGrid/module';
import { BackDropModule } from '../../../_core/widgets/backdrop/module';

@NgModule({
    declarations: [ViewCinemaHallComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ModalPopupModule,
        DataGridModule,
        BackDropModule,
        RouterModule.forChild(route)
    ],
    exports: [RouterModule]
})

export class ViewCinemaHallModule {}
