import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataGridComponent } from './component';

@NgModule({
    declarations: [ DataGridComponent ],
    imports: [
        CommonModule
    ],
    exports: [ DataGridComponent ]
})

export class DataGridModule {}