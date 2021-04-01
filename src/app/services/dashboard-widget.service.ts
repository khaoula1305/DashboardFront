import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardWidget } from '../models/dashboard-widget';


@Injectable({
  providedIn: 'root'
})
export class DashboardWidgetService {

  host: any = environment.hostApi + '/Dashboard/';
  constructor(private http: HttpClient) {
  }
  getAllDashboardWidget(dashboardId: any): Observable<DashboardWidget[]> {
    return this.http.get<DashboardWidget[]>(this.host+dashboardId+'/DashboardWidget');
  }
  addDashboardWidget( dashboardId: any, dashboardWidget: DashboardWidget):  Observable<DashboardWidget>{
   return  this.http.post<DashboardWidget>(this.host+dashboardId+'/DashboardWidget', dashboardWidget);
  }
  deleteDashboardWidget(dashboardId: any, dashboardWidget: DashboardWidget): Observable<DashboardWidget>{
    return this.http.delete<DashboardWidget>(this.host + dashboardId+'/DashboardWidget/'+ dashboardWidget.id);
  }
  updateDashboardWidget(dashboardId: any, dashboardWidget: DashboardWidget) : Observable<DashboardWidget>{
    return this.http.put<DashboardWidget>(this.host + dashboardId+'/DashboardWidget/', dashboardWidget);
  }
}
