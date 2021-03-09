import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DefaultComponent } from './layouts/default/default.component';

const routes: Routes = [
  {path: '', component: DefaultComponent},
  {path: 'widgetDetails', component: AppComponent}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
