import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWidgetRoutingModule } from './dashboard-widget-routing.module';
import { DashboardWidgetComponent } from './components/dashboard-widget/dashboard-widget.component';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CardModule} from 'primeng/card';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {DividerModule} from 'primeng/divider';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import {ChartModule} from 'primeng/chart';
import { SharedModule } from '../shared/shared-module.module';
import { WidgetConfigurationComponent } from './components/widget-configuration/widget-configuration.component';
import { InputTextModule } from 'primeng/inputtext';
import { WidgetModule } from '../widget/widget.module';

@NgModule({
  declarations: [
    DashboardWidgetComponent,
    WidgetConfigurationComponent
  ],
  imports: [
    CommonModule,
    DashboardWidgetRoutingModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    CardModule,
    ToastModule,
    TableModule,
    FormsModule,
    DividerModule,
    HttpClientModule,
    ButtonModule,
    ChartModule,
    SharedModule,
    InputTextModule,
    WidgetModule
    ],
  exports: [
    DashboardWidgetComponent
    ]
})
export class DashboardWidgetModule { }
