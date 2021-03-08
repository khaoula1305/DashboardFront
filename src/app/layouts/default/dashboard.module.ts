import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterModule } from 'angular-gridster2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WidgetComponent } from './widget/widget.component';                 
import {PanelModule} from 'primeng/panel';
import { DefaultComponent } from './default.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { WidgetPanelComponent } from './widget-panel/widget-panel.component';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [
    DashboardComponent,
    WidgetComponent,
    DefaultComponent,
    WidgetPanelComponent
  ],
  imports: [
    CommonModule,
    GridsterModule,
    BrowserAnimationsModule,
    PanelModule,
    ScrollPanelModule,
    CardModule
  ],
  exports: [
    DashboardComponent,
    WidgetComponent,
    DefaultComponent
  ]
})
export class DashboardModule { }
