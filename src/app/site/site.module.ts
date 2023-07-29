import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SiteRoutingModule } from './site-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from '../components/card/card.component';
import { RiskMeterComponent } from '../components/risk-meter/risk-meter.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';
import { CommonModule } from '@angular/common';
import { DashboardService } from './services/dashboard.service';


@NgModule({
  declarations: [
    DashboardComponent,
    CardComponent,
    RiskMeterComponent,
    DoughnutChartComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SiteRoutingModule,
    ChartsModule,
  ],
  providers: [ThemeService, DashboardService]
})
export class SiteModule { }
