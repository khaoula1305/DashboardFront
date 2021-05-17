import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueriesComponent } from './data-source/queries/queries.component';

const routes: Routes = [
  {
    path: 'dashboards',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { 
    path: 'dataSources', 
    loadChildren: () => import('./data-source/data-source.module').then(m => m.DataSourceModule) 
  },
  { 
    path: 'queries', 
    component: QueriesComponent,

  },
  {
    path: 'teams',
    loadChildren: () => import('./team/team.module').then(m => m.TeamModule)
  },
  {
    path: 'widgets',
    loadChildren: () => import('./widget/widget.module').then(m => m.WidgetModule)
  },
  {
    path: 'widgetDashboards',
    loadChildren: () => import('./dashboard-widget/dashboard-widget.module').then(m => m.DashboardWidgetModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
