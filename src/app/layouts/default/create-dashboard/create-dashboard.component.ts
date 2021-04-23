import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Dashboard } from 'src/app/models/dashboard.model';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.scss']
})
export class CreateDashboardComponent implements OnInit {
  messageControl = new FormControl('', Validators.required);
  title: string;
  description: string;
  selectedTeam;
  teams:any[];
  constructor(private dashboardService: DashboardsService,
    private router: Router) { }

  ngOnInit(): void {
    this.teams=[
      {name:'Team 1'},
      {name:'Team 2'},
    ];
  }
  onSubmit(m: NgForm) {
    if ( m.untouched || m.invalid) {
      alert('Required');
    } else {
      const dashboard : Dashboard = new Dashboard();
      dashboard.title = m.value.title;
      dashboard.description= m.value.description;
      this.dashboardService.addDashboard(dashboard).subscribe(
        result => this.router.navigate(['/'])
         );
    }
  }

}
