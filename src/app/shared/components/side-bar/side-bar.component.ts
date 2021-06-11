import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/team/models/User.model';
import { TeamsService } from '../../../team/services/team.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  user: User;
  constructor(
    private teamService: TeamsService) { }

  ngOnInit(): void {
    this.user = this.teamService.getCurrentUser();
  }

}
