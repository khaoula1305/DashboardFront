import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardEditionComponent } from './dashboard-edition/dashboard-edition.component';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { UpdateDashboardComponent } from './update-dashboard/update-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CardModule} from 'primeng/card';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {DividerModule} from 'primeng/divider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {SidebarModule} from 'primeng/sidebar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DialogModule} from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    DashboardEditionComponent,
    DashboardListComponent,
    UpdateDashboardComponent,
    DashboardComponent
    ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    CardModule,
    ToastModule,
    TableModule,
    FormsModule,
    DividerModule,
    Ng2SearchPipeModule,
    SidebarModule,
    OverlayPanelModule,
    AutoCompleteModule,
    DialogModule,
    HttpClientModule,
    ButtonModule

  ]
})
export class DashboardModule { }
