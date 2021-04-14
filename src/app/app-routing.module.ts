import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { QueriesComponent } from './layouts/queries/queries.component';
import { RestComponent } from './layouts/rest/rest.component';
import { WidgetConfigurationComponent } from './layouts/default/widget-configuration/widget-configuration.component';
import { AddWidgetComponent } from './layouts/default/add-widget/add-widget.component';
import { CreateDashboardComponent } from './layouts/default/create-dashboard/create-dashboard.component';
import { UpdateDashboardComponent } from './layouts/default/update-dashboard/update-dashboard.component';
import { DataSourceComponent } from './layouts/data-source/data-source.component';
import { MyWidgetsComponent } from './layouts/default/my-widgets/my-widgets.component';
import { QueryDetailsComponent } from './layouts/query-details/query-details.component';
import { DashboardComponent } from './layouts/default/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboards/:id', component: DashboardComponent },
  {path: 'queries', component: QueriesComponent},
  {path: 'rest', component: RestComponent},
  {path: 'updateWidget/:title', component: WidgetConfigurationComponent},
  {path: 'addWidget', component: AddWidgetComponent},
  {path: 'NewDashboard', component: CreateDashboardComponent},
  {path: 'updateDashboard/:id', component: UpdateDashboardComponent}, 
  {path: 'dataSource', component: DataSourceComponent},
  {path: 'myWidgets', component: MyWidgetsComponent},
  {path: 'queryDetails/:id', component: QueryDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
