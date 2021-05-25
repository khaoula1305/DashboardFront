import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { WidgetModule } from '../widget/widget.module';
import { GridsterModule } from 'angular-gridster2';
import {RadioButtonModule} from 'primeng/radiobutton';
import {PanelModule, } from 'primeng/panel';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SkeletonModule} from 'primeng/skeleton';
import {ScrollTopModule} from 'primeng/scrolltop';
import {InputTextModule} from 'primeng/inputtext';
import {SplitterModule} from 'primeng/splitter';
import { TagModule } from 'primeng/tag';
import {BadgeModule} from 'primeng/badge';
import {SplitButtonModule} from 'primeng/splitbutton';
import { DashboardWidgetModule } from '../dashboard-widget/dashboard-widget.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardEditionComponent } from './components/dashboard-edition/dashboard-edition.component';
import { DashboardListComponent } from './components/dashboard-list/dashboard-list.component';
import { UpdateDashboardComponent } from './components/update-dashboard/update-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared-module.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

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
    ButtonModule,
    WidgetModule,
    GridsterModule,
    DashboardWidgetModule,
    InputTextModule,
    RadioButtonModule,
    SharedModule,
    ConfirmDialogModule

  ]
})
export class DashboardModule { }
