
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Dashboard } from '../../dashboard/models/dashboard.model';
import { User } from '../models/User.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  currentUser: User;
  host: any = environment.hostApi + '/Team/';
  constructor(private http: HttpClient) {
  }
  //Instead of authentication
  setCurrentUser(){
    this.getAllUsers().subscribe(
      data=>  {
        localStorage.setItem('currentUser', JSON.stringify(data.pop));
    }
    )
  }
  getCurrentUser(): User{
  return JSON.parse(localStorage.getItem('currentUser'));
  }
  getAllTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(this.host+'AllTeams');
  }
  getTeam(teamId: any): Observable<Team>{
    return this.http.get<Team>(this.host+teamId);
  }
  getAllDashboards(teamId: any): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.host + teamId+ '/AllDashboards');
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.host + 'AllUsers');
  }

  addTeam(team: Team): Observable<Team>{
    return this.http.post<Team>(this.host, team);
  }
  updateTeam(team: Team):Observable<Team>{
    return this.http.put<Team>(environment.hostApi+ '/Team?id='+  team.id, team);
  }
  deleteTeam(teamId: any): Observable<Team>{
    return this.http.delete<Team>(this.host+ teamId);
  }
}
