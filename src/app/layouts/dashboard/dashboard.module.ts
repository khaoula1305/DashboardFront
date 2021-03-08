import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridsterModule } from 'angular-gridster2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WidgetComponent } from './widget/widget.component';                 

@NgModule({
  declarations: [
    DashboardComponent,
    WidgetComponent
  ],
  imports: [
    CommonModule,
    GridsterModule,
    BrowserAnimationsModule
  ],
  exports: [
    DashboardComponent,
    WidgetComponent
  ]
})
export class DashboardModule { }
