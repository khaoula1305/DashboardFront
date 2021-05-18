import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSourceRoutingModule } from './data-source-routing.module';
import { DataSourceComponent } from './components/data-source/data-source.component';
import {DropdownModule} from 'primeng/dropdown';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CardModule} from 'primeng/card';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {DividerModule} from 'primeng/divider';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { UpdateDataSourceComponent } from './components/update-data-source/update-data-source.component';
import { QueriesComponent } from './components/queries/queries.component';
import { QueryDetailsComponent } from './components/query-details/query-details.component';
import { RestEditionComponent } from './components/rest-edition/rest-edition.component';

@NgModule({
  declarations: [
    DataSourceComponent,
    UpdateDataSourceComponent,
    QueriesComponent,
    QueryDetailsComponent,
    RestEditionComponent,
  ],
  imports: [
    CommonModule,
    DataSourceRoutingModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    CardModule,
    ToastModule,
    TableModule,
    FormsModule,
    DividerModule,
    TreeModule,
    TreeTableModule,
    HttpClientModule,
    ButtonModule

  ]
})
export class DataSourceModule { }
