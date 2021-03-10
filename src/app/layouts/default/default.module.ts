import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget/widget.component';                
import {PanelModule, } from 'primeng/panel';
import { DefaultComponent } from './default/default.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { WidgetPanelComponent } from './widget-panel/widget-panel.component';
import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {ChartModule} from 'primeng/chart';
import { GridsterModule } from 'angular-gridster2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WidgetDashboardComponent } from './widget-dashboard/widget-dashboard.component';
import {SkeletonModule} from 'primeng/skeleton';



@NgModule({
  declarations: [
    WidgetComponent,
     WidgetPanelComponent,
      DashboardComponent, 
      WidgetDashboardComponent,
      DefaultComponent
    ],
  imports: [
    CommonModule,
    GridsterModule,
    BrowserAnimationsModule,
    PanelModule,
    ScrollPanelModule,
    CardModule,
    ButtonModule,
    ChartModule,
    SkeletonModule
  ],
  exports:[
    DefaultComponent
  ]
})
export class DefaultModule { }
