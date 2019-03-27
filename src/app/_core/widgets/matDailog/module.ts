import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule  } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { BackDropModule } from '../backdrop/module';
import { ToasterModule } from '../toaster/module';

import { ModalPopupComponent } from './component';

@NgModule({
    declarations: [
        ModalPopupComponent
    ],
    imports: [
        MatDialogModule,
        CommonModule,
        BackDropModule,
        ToasterModule,
        NgbModule,
        ReactiveFormsModule
    ],
    exports: [ModalPopupComponent],
    entryComponents: [ModalPopupComponent]
})
export class ModalPopupModule {}
