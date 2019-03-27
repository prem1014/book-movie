import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AddMovieComponent } from './component';
import { BackDropModule } from '../../../_core/widgets/backdrop/module';
import { ToasterModule } from '../../../_core/widgets/toaster/module';
import { route } from './route';

@NgModule({
    declarations: [AddMovieComponent],
    imports: [
        CommonModule,
        FormsModule,
        ToasterModule,
        BackDropModule,
        NgbModule,
        RouterModule.forChild(route)
    ],
    exports: [RouterModule]
})

export class AddMovieModule { }
