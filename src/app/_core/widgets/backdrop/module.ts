import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackDropComponent } from './component';

@NgModule({
    declarations: [BackDropComponent],
    imports: [
        CommonModule
    ],
    exports: [BackDropComponent]
})

export class BackDropModule {}