import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './components/teams.component';
import { TeamRoutingModule } from './team-routing.module';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CardModule} from 'primeng/card';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {DividerModule} from 'primeng/divider';
import {MultiSelectModule} from 'primeng/multiselect';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {TreeModule} from 'primeng/tree';
import {DialogModule} from 'primeng/dialog';
import {TreeTableModule} from 'primeng/treetable';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [
    TeamsComponent
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    ScrollPanelModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    CardModule,
    ToastModule,
    TableModule,
    FormsModule,
    DividerModule,
    MultiSelectModule,
    OverlayPanelModule,
    TreeModule,
    TreeTableModule,
    DialogModule,
    AutoCompleteModule,
    OverlayPanelModule,
    RadioButtonModule ,
    ConfirmDialogModule,
    HttpClientModule,
    InputTextModule
  ]
})
export class TeamModule { }
