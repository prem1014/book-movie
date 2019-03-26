import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToasterComponent } from './component';

@NgModule({
    declarations: [ ToasterComponent ],
    imports: [
        CommonModule
    ],
    exports: [ ToasterComponent ]
})

export class ToasterModule {}