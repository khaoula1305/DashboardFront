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
import { ButtonModule } from 'primeng/button';
import { VisualisationTypeComponent } from './widget-panel/visualisation-type/visualisation-type.component';

@NgModule({
  declarations: [
    DashboardComponent,
    WidgetComponent,
    DefaultComponent,
    WidgetPanelComponent,
    VisualisationTypeComponent
  ],
  imports: [
    CommonModule,
    GridsterModule,
    BrowserAnimationsModule,
    PanelModule,
    ScrollPanelModule,
    CardModule,
    ButtonModule
  ],
  exports: [
    DashboardComponent,
    WidgetComponent,
    DefaultComponent,
    WidgetPanelComponent
  ]
})
export class DashboardModule { }
