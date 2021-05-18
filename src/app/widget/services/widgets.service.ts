import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Widget } from '../models/widget.model';
import { DashboardWidget } from '../../dashboard-widget/models/dashboard-widget';
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
  getWidget(widgetId: any): Observable<Widget>{
    return this.http.get<Widget>(this.host+widgetId);
  }
  changeWidget(widget: Widget) {
    this.widgetSource.next(widget);
  }
  constructor(private http: HttpClient) {
  }

  getAllWidgets(): Observable<Widget[]> {
    return this.http.get<Widget[]>(this.host + 'AllWidgets');
  }

  getAllDashboardWidgets(widgetId: any): Observable<DashboardWidget[]> {
    return this.http.get<DashboardWidget[]>(this.host + widgetId+ '/AllDashboardWidgets');
  }
  addWidget(widget: Widget): Observable<Widget> {
    return this.http.post<Widget>(this.host, widget);
  }

  deleteWidget(widgetId: any) : Observable<Widget>{
    return this.http.delete<Widget>(this.host + widgetId);
  }

  updateWidget(widget: Widget): Observable<any> {
    return this.http.put(this.host + widget.id, widget);
  }
}
