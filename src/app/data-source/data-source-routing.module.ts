import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueriesComponent } from './components/queries/queries.component';
import { QueryDetailsComponent } from './components/query-details/query-details.component';
import { RestEditionComponent } from './components/rest-edition/rest-edition.component';
import { UpdateDataSourceComponent } from './components/update-data-source/update-data-source.component';

const routes: Routes = [
  { path: '', component: QueriesComponent },
  { path: 'restEdition', component: RestEditionComponent },
  { path: 'queryDetails/:id', component: QueryDetailsComponent },
  { path: 'updateDatasource/:id', component: UpdateDataSourceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataSourceRoutingModule {}
