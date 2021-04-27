import { Injectable } from '@angular/core';
import { DataSource} from '../models/data-source.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Widget } from '../models/widget.model';
import { Rest } from '../models/rest.model';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  host: any = environment.hostApi + '/DataSource/';

  constructor(private http: HttpClient) {}

  getAllDataSources(): Observable<DataSource[]> {
    return this.http.get<DataSource[]>(this.host + 'alldatasource');
  }
  getAllWidgets(datasourceId: any): Observable<Widget[]> {
    return this.http.get<Widget[]>(this.host + datasourceId+ '/allwidgets');
  }
  getDataFrom(dataSource: DataSource): Observable<any[]>{
      return this.http.get<any[]>(this.host+dataSource.id);
  }
  getDataFromURL( url: string ): Observable<any[]> {
    return this.http.get<any[]>(url);
  }
  GetDataAsync(datasource: Rest): Observable<any[]> {
    let headers;
    if(datasource.token){
        headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${datasource.token}`
      });
    console.log(datasource.token);
    return this.http.get<any[]>(datasource.url, { headers: headers });
    }
    else if(datasource.userName){
      headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      const psw=datasource.userName+":"+datasource.password;
      headers.append("Authorization", "Basic " + btoa(psw));
      const httpOptions = {
        headers: headers
      };
     console.log(datasource.userName);
      return this.http.get<any[]>(datasource.url, httpOptions);

    }
    else{
      return this.http.get<any[]>(datasource.url);
    }
  }
  getDataSource(dataSourceId: any) : Observable<any>{
    return this.http.get<any>(this.host +'test/'+ dataSourceId);
  }
  deleteDataSource(dataSourceId: any) : Observable<DataSource>{
    return this.http.delete<DataSource>(this.host + dataSourceId);
  }
  updateDataSource(dataSource: DataSource): Observable<any> {
    return this.http.put(environment.hostApi  +'/DataSource?DatasourceId='+ dataSource.id, dataSource);
  }
  addDataSource(dataSource: DataSource): Observable<DataSource>{
    return this.http.post<DataSource>(this.host, dataSource);
  }
}
