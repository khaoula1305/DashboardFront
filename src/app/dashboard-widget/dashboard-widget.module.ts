import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWidgetRoutingModule } from './dashboard-widget-routing.module';
import { DashboardWidgetComponent } from './dashboard-widget/dashboard-widget.component';
import { DashboardWidgetDetailsComponent } from './dashboard-widget-details/dashboard-widget-details.component';
import { WidgetConfigurationComponent } from './widget-configuration/widget-configuration.component';

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

@NgModule({
  declarations: [
    DashboardWidgetComponent,
    DashboardWidgetDetailsComponent,
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
    ButtonModule
  ]
})
export class DashboardWidgetModule { }
