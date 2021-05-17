import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { DataSourceModule } from './data-source/data-source.module';
import { TeamModule } from './team/team.module';
import { WidgetModule } from './widget/widget.module';
import { DashboardWidgetModule } from './dashboard-widget/dashboard-widget.module';
import {DividerModule} from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent
    ],
  imports: [
    CommonModule,
		AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    DashboardModule,
    DataSourceModule,
    TeamModule,
    WidgetModule,
    DashboardWidgetModule,
    DividerModule,
    AvatarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
