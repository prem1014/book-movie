import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BackDropModule } from '../_core/widgets/backdrop/module';
import { BookMovieComponent } from './component';

import { route } from './route';

@NgModule({
    declarations: [ BookMovieComponent ],
    imports: [
        CommonModule,
        BackDropModule,
        RouterModule.forChild(route)
    ],
    exports: [ RouterModule ]
})

export class BookMovieModule {}
