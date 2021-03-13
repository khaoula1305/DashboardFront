import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Widget } from '../models/widget.model';
import { GraphWidget } from "../models/graph-widget.model";
import { Query } from '../models/query.model';
import { DataSource } from '../models/data-source.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  widgets: Widget[]=[];
  constructor(private http: HttpClient) { 
    let widgetType: GraphWidget={id:1, type: 'bar',  img: "../../../../assets/increase.png"};
    let dataSource: DataSource =    {id: 1, title: "source 1", url: "https://api.covidtracking.com/v1/us/daily.json" }
    let query: Query= {id:1 , name: 'query 1', dimension:'date' , mesure1: "negative", mesure2: "positive", mesure3: "", dataSource: dataSource};
    this.widgets=[
      {id : 1, title : "Widget 1", description: "Description here: lorem " , type: widgetType, resizeEnabled: true, minItemCols: 1, minItemRows: 1, query:query},
      {id : 2, title : "Widget 2", description: "Description here: lorem " , type: widgetType, resizeEnabled: true, minItemCols: 1, minItemRows: 1, query:query},
      {id : 3, title : "Widget 3", description: "Description here: test " , type: widgetType, resizeEnabled: true, minItemCols: 1, minItemRows: 1, query:query},
      {id : 4, title : "Widget 4", description: "Description here: demo " , type: widgetType, resizeEnabled: true, minItemCols: 1, minItemRows: 1, query:query},
      {id : 5, title : "Widget 5", description: "Description here: circle " , type: widgetType, resizeEnabled: true, minItemCols: 1, minItemRows: 1, query:query},
      {id : 6, title : "circle 6", description: "Description here: circle " ,type: widgetType, resizeEnabled: true, minItemCols: 1, minItemRows: 1, query:query},
      {id : 7, title : "Widget 6", description: "Description here: lorem " , type: widgetType, resizeEnabled: true, minItemCols: 1, minItemRows: 1, query:query},
      {id : 8, title : "Widget 6", description: "Description here: lorem " , type: widgetType, resizeEnabled: true, minItemCols: 1, minItemRows: 1, query:query},
      
    ];
  }

  /*getAllWidgets(): Observable<Widget[]> {
    let host= environment.host;
    return Widget;
  }*/

  getAllWidgets(): Widget[] {
    // get from API
    return this.widgets;
  
  }

  addWidget(): Observable<Widget>{
    return;
  }

  removeWidget(widgetId: number){
  
  }

  configureWidget(widget: Widget): Observable<Widget>{
    return;
  }

}


