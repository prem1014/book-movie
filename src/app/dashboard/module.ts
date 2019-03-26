import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HighchartsChartModule } from 'highcharts-angular';

import { DashboardComponent } from './component';
import { DataGridModule } from '../_core/widgets/dataGrid/module';
import { BackDropModule } from '../_core/widgets/backdrop/module';
import { ToasterModule } from '../_core/widgets/toaster/module';

import { route } from './route';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DataGridModule,
        BackDropModule,
        ToasterModule,
        HighchartsChartModule,
        RouterModule.forChild(route)
    ],
    exports: [RouterModule]
})

export class DashboardModule {}
