import { Injectable } from '@angular/core';
import { Dashboard } from '../models/dashboard.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  currentDasboard: Dashboard;
  host: any = environment.hostApi + '/Dashboard/';
  constructor(private http: HttpClient) { }

  getAllDashboards(): Observable<Dashboard[]>{
    return this.http.get<Dashboard[]>(this.host + 'AllDashboards');
  }
  getDashboard(dashboardId: any): Observable<Dashboard>{
    return this.http.get<Dashboard>(this.host + dashboardId);
  }

  addDashboard(dashboard: Dashboard): Observable<Dashboard>{
    return this.http.post<Dashboard>(this.host, dashboard);
  }
  setCurrentDashboard(dashboard: Dashboard){
    localStorage.setItem('currentDashboard', JSON.stringify(dashboard)
    );
  }
  getCurretDashboard(): Dashboard{
    return JSON.parse(localStorage.getItem('currentDashboard'));
  }
  updateDashboard(dashboard: Dashboard): Observable<Dashboard>{
    return this.http.put<Dashboard>(this.host + '?id=' +  dashboard.id, dashboard);
  }
  deleteDashboard(dashboardId: any): Observable<Dashboard>{
    return this.http.delete<Dashboard>(this.host + dashboardId);
  }
}
