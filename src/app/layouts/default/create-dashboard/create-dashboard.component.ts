import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Dashboard } from 'src/app/models/dashboard.model';
import { Team } from 'src/app/models/team.model';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { TeamsService } from 'src/app/services/team.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.scss']
})
export class CreateDashboardComponent implements OnInit {
  messageControl = new FormControl('', Validators.required);
  selectedTeam:Team;
  teams:Team[];
  dashboard:Dashboard=new Dashboard();
  constructor(
    private dashboardService: DashboardsService,
    private router: Router,
    private teamService: TeamsService) { }

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe(
      (data)=> {
        this.teams=data;
      });
  }
  onSubmit(m: NgForm) {
    if ( m.untouched || m.invalid) {
      alert('Required');
    } else {
      this.dashboardService.addDashboard(this.dashboard).subscribe(
        result =>   this.changeLocation()
         );
    }
  }
  changeLocation() {
    this.router.navigateByUrl('/teams', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/', ]); // navigate to same route
    });
  }
}
