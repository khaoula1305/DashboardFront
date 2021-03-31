import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  
  title: string;
  description: string;
  constructor(private dashboardService: DashboardsService,
    private router: Router) { }

  ngOnInit(): void {

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
