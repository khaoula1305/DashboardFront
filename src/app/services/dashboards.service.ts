import { Injectable } from '@angular/core';
import { Dashboard } from '../models/dashboard.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  constructor(private http: HttpClient) { }

  getAllDashboards(): Observable<Dashboard[]>{
    let host= environment.host;
    return this.http.get<Dashboard[]>(host+"");
  }

  addDashboard(): Observable<Dashboard>{
    return;
  }

  editDashboard(dashboard: Dashboard): Observable<Dashboard>{
    return;
  }

  removeDashboard(dashboard: Dashboard): Observable<Dashboard>{
    return;
  }
}
