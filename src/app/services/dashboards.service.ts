import { Injectable } from '@angular/core';
import { Dashboard } from '../models/dashboard.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  host: any = environment.host + '/dashboards/';

  constructor(private http: HttpClient) { }

  getAllDashboards(): Observable<Dashboard[]>{
    return this.http.get<Dashboard[]>(this.host);
  }

  addDashboard(dashboard: Dashboard){
    this.http.post(this.host, dashboard);
  }

  updateDashboard(dashboard: Dashboard){
    this.http.put(this.host, dashboard);
  }

  deleteDashboard(dashboardId: number){
    this.http.delete(this.host + dashboardId);
  }
}
