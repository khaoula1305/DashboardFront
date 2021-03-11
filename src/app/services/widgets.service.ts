import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Widget } from '../models/widget.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  constructor(private http: HttpClient) { }

  getAllWidgets(): Observable<Widget[]>{
    let host= environment.host;
    return;
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


