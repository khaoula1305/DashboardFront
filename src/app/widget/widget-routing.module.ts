import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WidgetDetailsComponent } from './widget-details/widget-details.component';
import { WidgetListComponent } from './widget-list/widget-list.component';
import { AddWidgetComponent } from './add-widget/add-widget.component';
import { UpdateWidgetComponent } from './update-widget/update-widget.component';

const routes: Routes = [
 {path: 'widgetDetails/:id', component: WidgetDetailsComponent},
 {path: 'addWidget', component: AddWidgetComponent},
 {path: '', component: WidgetListComponent},
 {path: 'upWidget/:id', component: UpdateWidgetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetRoutingModule { }