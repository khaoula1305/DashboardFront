import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WidgetType } from '../models/widget-type';

@Injectable({
  providedIn: 'root'
})
export class WidgetTypeService {
  host: any = environment.host + '/widgetTypes/';

  constructor(private http: HttpClient) { }

  getAllWidgetTypes(): Observable<WidgetType[]>{
    return this.http.get<WidgetType[]>(this.host);
  }

  addWidgetType(widgetType: WidgetType){
    this.http.post(this.host, widgetType);
  }

  updateWidgetType(widgetType: WidgetType){
    console.log(widgetType.id + ' updated');
    this.http.put(this.host, widgetType);
  }

  deleteWidgetType(widgetTypeId: number){
    console.log(widgetTypeId + ' deleted');
    this.http.delete(this.host + widgetTypeId);
  }
}

