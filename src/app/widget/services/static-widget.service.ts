import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaticWidgetService {

  constructor(private http: HttpClient) {}

  getDataFromURL( url: string ): Observable<any[]>{
    return this.http.get<any>(url);
  }
}
