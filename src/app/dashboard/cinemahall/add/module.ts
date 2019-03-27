import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BackDropModule } from '../../../_core/widgets/backdrop/module';
import { ToasterModule } from '../../../_core/widgets/toaster/module';

import { AddCinemaHallComponent } from './component';
import { route } from './route';

@NgModule({
    declarations: [AddCinemaHallComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BackDropModule,
        ToasterModule,
        RouterModule.forChild(route)
    ],
    exports: [RouterModule]
})

export class AddCinemaHallModule {}
