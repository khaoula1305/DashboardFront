import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardWidget } from '../models/dashboard-widget';


@Injectable({
  providedIn: 'root'
})
export class DashboardWidgetService {

  host:any = environment.host +"/dashboardWidgets/";


  constructor(private http: HttpClient) { 

  }

  getAllDashboardWidget(): Observable<DashboardWidget[]> {
    return this.http.get<DashboardWidget[]>(this.host);
  }

  addDashboardWidget(dashboardWidget: DashboardWidget){
    this.http.post(this.host, dashboardWidget);
  }

  deleteDashboardWidget(dashboardWidgetId: number){
    console.log(dashboardWidgetId + " deleted");
    this.http.delete(this.host + dashboardWidgetId);
  }

  updateDashboardWidget(dashboardWidget: DashboardWidget){
    console.log(dashboardWidget.id + " updated");
    this.http.put(this.host, dashboardWidget);
  }

}
