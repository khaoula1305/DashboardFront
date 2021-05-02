import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget/widget.component';
import {PanelModule, } from 'primeng/panel';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { WidgetPanelComponent } from './widget-panel/widget-panel.component';
import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {ChartModule} from 'primeng/chart';
import { GridsterModule } from 'angular-gridster2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardWidgetComponent } from './dashboard-widget/dashboard-widget.component';
import {SkeletonModule} from 'primeng/skeleton';
import {ScrollTopModule} from 'primeng/scrolltop';
import {InputTextModule} from 'primeng/inputtext';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { WidgetConfigurationComponent } from './widget-configuration/widget-configuration.component';
import { DefaultRoutingModule } from './default-routing.module';
import {DropdownModule} from 'primeng/dropdown';
import {SplitterModule} from 'primeng/splitter';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { TagModule } from 'primeng/tag';
import {BadgeModule} from 'primeng/badge';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DividerModule} from 'primeng/divider';
import {TableModule} from 'primeng/table';
import { CreateDashboardComponent } from './create-dashboard/create-dashboard.component';
import { UpdateDashboardComponent } from './update-dashboard/update-dashboard.component';
import { MyWidgetsComponent } from './my-widgets/my-widgets.component';
import {ToastModule} from 'primeng/toast';
import { TableComponent } from './widget-types/table/table.component';
import { GraphComponent } from './widget-types/graph/graph.component';
import { CardComponent } from './widget-types/card/card.component';
import { UpdateWidgetComponent } from './update-widget/update-widget.component';
import {SidebarModule} from 'primeng/sidebar';
import { WidgetDetailsComponent } from './widget-details/widget-details.component';
import { DashboardWidgetDetailsComponent } from './dashboard-widget-details/dashboard-widget-details.component';
@NgModule({
  declarations: [
    WidgetComponent,
     WidgetPanelComponent,
      DashboardComponent,
      DashboardWidgetComponent,
      WidgetConfigurationComponent,
      AddWidgetComponent,
      CreateDashboardComponent,
      UpdateDashboardComponent,
      MyWidgetsComponent,
      TableComponent,
      GraphComponent,
      CardComponent,
      UpdateWidgetComponent,
      WidgetDetailsComponent,
      DashboardWidgetDetailsComponent
    ],
  imports: [
    CommonModule,
    GridsterModule,
    DefaultRoutingModule,
    BrowserAnimationsModule,
    PanelModule,
    ScrollPanelModule,
    CardModule,
    ButtonModule,
    ChartModule,
    SkeletonModule,
    ScrollTopModule,
    InputTextModule,
    Ng2SearchPipeModule,
    FormsModule,
    DropdownModule,
    SplitterModule,
    TagModule,
    BadgeModule,
    SplitButtonModule,
    DividerModule,
    TableModule,
    ToastModule,
    SidebarModule
  ],
  exports: [
  ]
})
export class DefaultModule { }
