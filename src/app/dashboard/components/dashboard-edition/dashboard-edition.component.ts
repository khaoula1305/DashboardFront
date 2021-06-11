import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { Dashboard } from 'src/app/dashboard/models/dashboard.model';
import { DashboardsService } from 'src/app/dashboard/services/dashboards.service';
import { Team } from 'src/app/team/models/team.model';
import { TeamsService } from 'src/app/team/services/team.service';
@Component({
  selector: 'app-dashboard-edition',
  templateUrl: './dashboard-edition.component.html',
  styleUrls: ['./dashboard-edition.component.scss']
})
export class DashboardEditionComponent implements OnInit {

  messageControl = new FormControl('', Validators.required);
  selectedTeam: Team;
  teams: Team[];
  dashboard: Dashboard = new Dashboard();
  constructor(
    private dashboardService: DashboardsService,
    private router: Router,
    private teamService: TeamsService) { }

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe(
      (data) => {
        this.teams = data.filter(team => team.title !== Constants.myDashboards);
      });
  }
  onSubmit(m: NgForm): void {
      this.dashboardService.addDashboard(this.dashboard).subscribe(
        result =>   this.changeLocation()
         );
  }
  changeLocation(): void {
    this.router.navigateByUrl('/teams', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/', ]); // navigate to same route
    });
  }

}
