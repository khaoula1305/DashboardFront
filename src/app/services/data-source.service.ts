import { Injectable } from '@angular/core';
import { DataSource} from '../models/data-source.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

 dataSource: DataSource[];
  constructor(private http: HttpClient) {

    this.dataSource=[
      {id: 1, title: "source 1", url: "https://api.covidtracking.com/v1/us/daily.json" },
      {id: 2, title: "source 2", url: ""},
      {id: 3, title: "source 3", url: ""}
    ]
  }
   getAllDataSource(){
     return this.dataSource;
   }
   getData(dt : DataSource): Observable<any[]>{

    return this.http.get<any[]>(dt.url);
   }
}
