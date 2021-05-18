import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UpdateDashboardComponent } from './components/update-dashboard/update-dashboard.component';
import { DashboardListComponent } from './components/dashboard-list/dashboard-list.component';
import { DashboardEditionComponent } from './components/dashboard-edition/dashboard-edition.component';

const routes: Routes = [
  {path: '', component: DashboardListComponent}, 
  {path: ':id', component: DashboardComponent },
  {path: 'updateDashboard/:id', component: UpdateDashboardComponent}, 
  {path: 'NewDashboard', component: DashboardEditionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
