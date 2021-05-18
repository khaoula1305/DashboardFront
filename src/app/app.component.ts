import { Component } from '@angular/core';
import { TeamsService } from './team/services/team.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dashboard ';
  constructor(  private teamService: TeamsService){
    this.teamService.setCurrentUser();
  }
}
