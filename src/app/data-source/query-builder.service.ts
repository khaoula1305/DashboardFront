import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {

  host: any = environment.hostApi + '/DataSourceQB/';
  constructor(private http: HttpClient) { }
  
  getData(idWidget: any): Observable<any[]>{
    return this.http.get<any[]>(this.host+idWidget);
  }

 getDataForDetails(sqlText: string): Observable<any[]>{
   const headers = new HttpHeaders({
    'Content-Type': 'application/json'
}); 
   const json=JSON.stringify(sqlText);
  return this.http.post<any[]>(this.host+'Details', json, {headers: headers});
}
}
