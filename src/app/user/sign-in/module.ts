import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ToasterModule } from '../../_core/widgets/toaster/module';
import { BackDropModule } from '../../_core/widgets/backdrop/module';
import { route } from './route';
import { SignInComponent } from './component';

@NgModule({
    declarations: [
        SignInComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ToasterModule,
        BackDropModule,
        RouterModule.forChild(route)
    ],
    exports: [RouterModule]
})

export class SignInModule {}