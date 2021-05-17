import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateDashboardComponent } from './update-dashboard/update-dashboard.component';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { DashboardEditionComponent } from './dashboard-edition/dashboard-edition.component';

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
