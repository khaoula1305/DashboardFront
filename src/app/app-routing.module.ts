import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './layouts/home/home.component';
import { DefaultRoutingModule } from './layouts/default/default-routing.module';
import { DefaultComponent } from './layouts/default/default/default.component';
import { QueriesComponent } from './layouts/queries/queries.component';
import { RestComponent } from './layouts/rest/rest.component';

const routes: Routes = [
  //{path: '', component: DefaultComponent},
  {path: 'dashboards/:title', component: DefaultComponent },
  {path: 'queries', component: QueriesComponent}, 
  {path: 'rest', component: RestComponent},
  {path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }