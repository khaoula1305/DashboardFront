import { Injectable } from '@angular/core';
import { widgetDashboard } from '../models/widgetDashboard';

@Injectable({
  providedIn: 'root'
})
export class WidgetDashboardService {

  //any should be widgetDashboard ?? widget
  widgetDashboard:  Array<any>=new Array();
  constructor() { 

    this.widgetDashboard=[
      {cols: 2, rows: 1, y: 0, x: 0, resizeEnabled:true, dragEnabled:true , title:"Widget 1" },
      {cols: 2, rows: 2, y: 0, x: 2, resizeEnabled:true, dragEnabled:true, title:"Widget 2"},
      {cols: 1, rows: 1, y: 1, x: 1, resizeEnabled:true, dragEnabled:true, title:"Widget 2"}
    ];

  }

  getAllWidgets(): any[] {
    console.log('idgets services', this.widgetDashboard);
    return this.widgetDashboard;
  
  }

  addWidget(widget: any){
    this.widgetDashboard.push(widget);
  }

}
