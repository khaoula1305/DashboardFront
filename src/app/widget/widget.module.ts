import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWidgetComponent } from './components/add-widget/add-widget.component';
import { WidgetListComponent } from './components/widget-list/widget-list.component';
import { WidgetDetailsComponent } from './components/widget-details/widget-details.component';
import { WidgetPanelComponent } from './components/widget-panel/widget-panel.component';
import { WidgetComponent } from './components/widget/widget.component';
import { WidgetEditionComponent } from './components/widget-edition/widget-edition.component';
import { WidgetRoutingModule } from './widget-routing.module';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CardModule} from 'primeng/card';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {DividerModule} from 'primeng/divider';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SidebarModule} from 'primeng/sidebar';
import { UpdateWidgetComponent } from './components/update-widget/update-widget.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { GraphComponent } from './components/widget-types/graph/graph.component';
import { CardComponent } from './components/widget-types/card/card.component';
import { TableComponent } from './components/widget-types/table/table.component';
import { SharedModule } from '../shared/shared-module.module';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
@NgModule({
  declarations: [
    AddWidgetComponent,
    WidgetListComponent,
    WidgetDetailsComponent,
    WidgetPanelComponent,
    WidgetComponent,
    WidgetEditionComponent,
    UpdateWidgetComponent,
    GraphComponent,
    CardComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    WidgetRoutingModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    CardModule,
    ToastModule,
    TableModule,
    FormsModule,
    DividerModule,
    ScrollPanelModule,
    ScrollTopModule,
    Ng2SearchPipeModule,
    SidebarModule,
    HttpClientModule,
    ButtonModule,
    SharedModule,
    InputTextModule,
    ChartModule
  ],
  exports:[
    WidgetPanelComponent
  ]
})
export class WidgetModule { }
