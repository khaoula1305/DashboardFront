import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataSourceComponent } from './data-source/data-source.component';
import { UpdateDataSourceComponent } from './update-data-source/update-data-source.component';
import { QueriesComponent } from './queries/queries.component';
import { QueryDetailsComponent } from './query-details/query-details.component';
import { RestEditionComponent } from './rest-edition/rest-edition.component';

const routes: Routes = [
  { path: '', component: DataSourceComponent },
  { path: 'queries', component: QueriesComponent },
  { path: 'restEdition', component: RestEditionComponent },
  { path: 'queryDetails/:id', component: QueryDetailsComponent },
  { path: 'updateDatasource/:id', component: UpdateDataSourceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataSourceRoutingModule {}
