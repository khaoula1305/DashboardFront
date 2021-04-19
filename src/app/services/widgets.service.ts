import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Widget } from '../models/widget.model';
import {BehaviorSubject} from 'rxjs';  

@Injectable({
  providedIn: 'root',
})
export class WidgetsService {
  host: any = environment.hostApi + '/Widget/';
  private widgetSource = new BehaviorSubject<Widget>(new Widget());

  currentWidget = this.widgetSource.asObservable();


  getCurrentWidget(){
    console.log('curent from using service',this.widgetSource.getValue());
  }
  changeWidget(widget: Widget) {
    this.widgetSource.next(widget);
  }
  

  constructor(private http: HttpClient) {
 

  }

  getAllWidgets(): Observable<Widget[]> {
    return this.http.get<Widget[]>(this.host + 'allwidgets');
  }
  addWidget(widget: Widget): Observable<Widget> {
    return this.http.post<Widget>(this.host, widget);
  }

  deleteWidget(widgetId: any) : Observable<Widget>{
    console.log('delete', widgetId);
    return this.http.delete<Widget>(this.host + widgetId);
  }

  updateWidget(widget: Widget): Observable<any> {
    return this.http.put(this.host + widget.id, widget);
  }

  /*setCurrentWidget(widget: Widget){
    //this.itemValue.next(widget);// this will make sure to tell every subscriber about the change
    localStorage.setItem('currentWidget', JSON.stringify(widget));
  }
  getCurretWidget(): Widget{
    return JSON.parse(localStorage.getItem('currentWidget'));
  }*/
}
