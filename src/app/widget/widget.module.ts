import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { WidgetListComponent } from './widget-list/widget-list.component';
import { WidgetDetailsComponent } from './widget-details/widget-details.component';
import { WidgetPanelComponent } from './widget-panel/widget-panel.component';
import { WidgetComponent } from './widget/widget.component';
import { WidgetEditionComponent } from './widget-edition/widget-edition.component';
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
import { UpdateWidgetComponent } from './update-widget/update-widget.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { GraphComponent } from './widget-types/graph/graph.component';
import { CardComponent } from './widget-types/card/card.component';
import { TableComponent } from './widget-types/table/table.component';
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
    ButtonModule
  ]
})
export class WidgetModule { }
