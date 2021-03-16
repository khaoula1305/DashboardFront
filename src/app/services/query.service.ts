import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Query } from '../models/query.model';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  host: any = environment.host + '/queries/';

  constructor(private http: HttpClient) { }

  getAllQueries(): Observable<Query[]>{
    return this.http.get<Query[]>(this.host);
  }

  addQuery(query: Query){
    this.http.post(this.host, query);
  }

  updateQuery(query: Query){
    console.log(query.id + ' updated');
    this.http.put(this.host, query);
  }

  deleteQuery(queryId: number){
    console.log(queryId + ' deleted');
    this.http.delete(this.host + queryId);
  }
}

