import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetConfigurationComponent } from './widget-configuration/widget-configuration.component';


const routes: Routes = [
  {path: 'updateWidget/:title', component: WidgetConfigurationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardWidgetRoutingModule { }