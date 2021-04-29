
import { Injectable } from '@angular/core';
import { Team } from '../models/team.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  host: any = environment.hostApi + '/Team/';
  constructor(private http: HttpClient) { }

  getAllTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(this.host+'allteams');
  }
  getTeam(teamId: any): Observable<Team>{
    return this.http.get<Team>(this.host+teamId);
  }
  getAllDashboards(teamId: any): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.host + teamId+ '/allDashboards');
  }

  addTeam(team: Team): Observable<Team>{
    return this.http.post<Team>(this.host, team);
  }
  updateTeam(team: Team):Observable<Team>{
    return this.http.put<Team>(this.host+ '?id='+  team.id, team);
  }
  deleteTeam(teamId: any): Observable<Team>{
    return this.http.delete<Team>(this.host+ teamId);
  }
}
