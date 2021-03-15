import { Injectable } from '@angular/core';
import { DataSource} from '../models/data-source.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private http: HttpClient) {
  }
   getAllDataSource(){
    // return this.dataSource;
   }
   getData(dataSource: DataSource): Observable<any[]>{
     return this.http.get<any[]>(dataSource.url);
   }
}
