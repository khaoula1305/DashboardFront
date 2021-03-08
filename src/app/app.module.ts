import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './layouts/dashboard/dashboard.module';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';

<<<<<<< HEAD
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AvatarModule } from "primeng/avatar";
import { BadgeModule } from "primeng/badge";

=======
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
>>>>>>> 9b5d2b9cfb9864f5998ae363ca8996c06759cc9f
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    BrowserAnimationsModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    PanelMenuModule,
    AvatarModule,
    BadgeModule,
=======
    DashboardModule,
    BrowserAnimationsModule
>>>>>>> 9b5d2b9cfb9864f5998ae363ca8996c06759cc9f
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
