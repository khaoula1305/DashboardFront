import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { DefaultModule } from './layouts/default/default.module';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { QueriesComponent } from './layouts/queries/queries.component';
import { RestComponent } from './layouts/rest/rest.component';
import { HomeComponent } from './layouts/home/home.component';
import {CardModule} from 'primeng/card';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import { DataSourceComponent } from './layouts/data-source/data-source.component';
import {MultiSelectModule} from 'primeng/multiselect';
import {CheckboxModule} from 'primeng/checkbox';
import { QueryDetailsComponent } from './layouts/query-details/query-details.component';
import {DropdownModule} from 'primeng/dropdown';
import {DividerModule} from 'primeng/divider';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { UpdateDataSourceComponent } from './layouts/update-data-source/update-data-source.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { TeamsComponent } from './layouts/teams/teams.component';
import {TreeModule} from 'primeng/tree';
import {DialogModule} from 'primeng/dialog';
import {TreeTableModule} from 'primeng/treetable';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {OverlayPanelModule} from 'primeng/overlaypanel';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SideBarComponent,
    QueriesComponent,
    RestComponent,
    HomeComponent,
    DataSourceComponent,
    QueryDetailsComponent,
    UpdateDataSourceComponent,
    TeamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    PanelMenuModule,
    AvatarModule,
    BadgeModule,
    DefaultModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    CardModule,
    FormsModule,
    TableModule,
    ToastModule,
    MultiSelectModule,
    CheckboxModule,
    DropdownModule,
    MessageModule,
    MessagesModule,
    DividerModule,
    ScrollPanelModule,
    TreeModule,
    DialogModule,
    TreeTableModule,
    AutoCompleteModule,
    OverlayPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
