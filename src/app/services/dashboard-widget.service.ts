import { Injectable } from '@angular/core';
import { DashboardWidget } from '../models/dashboard-widget';
import { Dashboard } from '../models/dashboard.model';
import { DataSourceService } from './data-source.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardWidgetService {

  //any should be widgetDashboard ?? widget
  dashboardWidget:  Array<DashboardWidget>=new Array();
  dashboard: Dashboard= {id: 1, title: 'Dash 1', description: " for test"};
  constructor() { 
    this.dashboardWidget=[
      {id: 2, description: " description ", x: 1, y: 0, cols: 2, rows:1, title:"Widget 1", dashboard: this.dashboard , widget: null , dataSource: null },
    ];

  }

  getAllWidgets(): any[] {

    return this.dashboardWidget;
  
  }

  addWidget(widget: any){
    this.dashboardWidget.push(widget);
  }

}
