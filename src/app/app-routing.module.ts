import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './layouts/home/home.component';
import { DefaultRoutingModule } from './layouts/default/default-routing.module';
import { DefaultComponent } from './layouts/default/default/default.component';
import { QueriesComponent } from './layouts/queries/queries.component';
import { RestComponent } from './layouts/rest/rest.component';
import { WidgetConfigurationComponent } from './layouts/default/widget-configuration/widget-configuration.component';
import { AddWidgetComponent } from './layouts/default/add-widget/add-widget.component';
import { CreateDashboardComponent } from './layouts/default/create-dashboard/create-dashboard.component';
import { UpdateDashboardComponent } from './layouts/default/update-dashboard/update-dashboard.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboards/:id', component: DefaultComponent },
  {path: 'queries', component: QueriesComponent},
  {path: 'rest', component: RestComponent},
  {path: 'updateWidget/:title', component: WidgetConfigurationComponent},
  {path: 'addWidget', component: AddWidgetComponent},
  {path: 'NewDashboard', component: CreateDashboardComponent},
  {path: 'updateDashboard/:id', component: UpdateDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
