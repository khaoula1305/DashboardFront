import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Widget } from '../models/widget.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  widgets: Widget[]=[];
  constructor(private http: HttpClient) { 
    this.widgets=[
      {id : 1, title : "Widget 1", description: "Description here: lorem " , img: "../../../../assets/increase.png"},
      {id : 2, title : "Widget 2", description: "Description here: lorem " , img: "../../../../assets/increase.png"},
      {id : 3, title : "Widget 3", description: "Description here: test " , img: "../../../../assets/increase.png"},
      {id : 4, title : "Widget 4", description: "Description here: demo " , img: "../../../../assets/increase.png"},
      {id : 5, title : "Widget 5", description: "Description here: circle " , img: "../../../../assets/graph.png"},
      {id : 6, title : "Widget 6", description: "Description here: lorem " , img: "../../../../assets/increase.png"},
      {id : 7, title : "Widget 6", description: "Description here: lorem " , img: "../../../../assets/increase.png"},
      {id : 8, title : "Widget 6", description: "Description here: lorem " , img: "../../../../assets/increase.png"},
      
    ];
  }

  /*getAllWidgets(): Observable<Widget[]> {
    let host= environment.host;
    return Widget;
  }*/

  getAllWidgets(): Widget[] {
    console.log('idgets services', this.widgets);
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


