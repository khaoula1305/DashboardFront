import { Injectable } from '@angular/core';
import { Dashboard } from '../models/dashboard.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  currentDasboard: Dashboard;
  host: any = environment.hostApi + '/Dashboard/';
  constructor(private http: HttpClient) { }

  getAllDashboards(): Observable<Dashboard[]>{
    return this.http.get<Dashboard[]>(this.host+'alldashboards');
  }
  getDashboard(dashboardId: any): Observable<Dashboard>{
    return this.http.get<Dashboard>(this.host+dashboardId);
  }

  addDashboard(dashboard: Dashboard): Observable<Dashboard>{
    return this.http.post<Dashboard>(this.host, dashboard);
  }
  setDashboard(dashboard: Dashboard){

    this.currentDasboard=dashboard;

  }
  updateDashboard(dashboard: Dashboard):Observable<Dashboard>{
    return this.http.put<Dashboard>(this.host, dashboard);
  }

  deleteDashboard(dashboardId: any): Observable<Dashboard>{
    return this.http.delete<Dashboard>(this.host + dashboardId);
  }
}
