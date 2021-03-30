import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WidgetType } from '../models/widget-type';

@Injectable({
  providedIn: 'root'
})
export class WidgetTypeService {
  host: any = environment.hostApi + '/WidgetType/';

  constructor(private http: HttpClient) { }

  getAllWidgetTypes(): Observable<WidgetType[]>{
    return this.http.get<WidgetType[]>(this.host+'allwidgettypes');
  }

  addWidgetType(widgetType: WidgetType){
    this.http.post(this.host, widgetType);
  }
  updateWidgetType(widgetType: WidgetType){
    this.http.put(this.host, widgetType);
  }
  deleteWidgetType(widgetTypeId: number){
    this.http.delete(this.host + widgetTypeId);
  }
}

