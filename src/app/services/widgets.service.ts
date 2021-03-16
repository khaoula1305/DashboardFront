import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Widget } from '../models/widget.model';


@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  host: any = environment.host + '/widgets/';

  widgets: Widget[] = [];

  constructor(private http: HttpClient) {

  }

  getAllWidgets(): Observable<Widget[]> {
    return this.http.get<Widget[]>(this.host);
  }

  addWidget(widget: Widget): Observable<Widget>{
    return this.http.post<Widget>(this.host, widget);
  }

  deleteWidget(widgetId: number){
    console.log(widgetId + ' deleted');
    this.http.delete(this.host + widgetId);
  }

  updateWidget(widget: Widget):Observable<any> {
    console.log('widash', widget);
    console.log(widget.id + ' updated');
    return this.http.put(this.host + widget.id,widget);
  }

}


