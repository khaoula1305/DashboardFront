import { Injectable } from '@angular/core';
import { DataSource} from '../models/data-source.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  host: any = environment.hostApi + '/DataSource/';

  constructor(private http: HttpClient) {}

  getAllDataSources(): Observable<DataSource[]> {
    return this.http.get<DataSource[]>(this.host + 'alldatasource');
  }
  addDataSource(dataSource: DataSource): Observable<DataSource> {
    return this.http.post<DataSource>(this.host, dataSource);
  }
  getDataFromURL( url: string ): Observable<any[]> {
    return this.http.get<any[]>(url);
  }
  deleteDataSource(dataSourceId: number) {
    this.http.delete(this.host + dataSourceId);
  }
  updateDataSource(dataSource: DataSource): Observable<any> {
    return this.http.put(this.host + dataSource.id, dataSource);
  }
}
