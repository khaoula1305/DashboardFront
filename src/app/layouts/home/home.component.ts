import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/models/dashboard.model';
import { DashboardsService } from 'src/app/services/dashboards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dashboards: Dashboard[];
  load = false;
  constructor(private dashboardService: DashboardsService) { }

  ngOnInit(): void {
    this.dashboardService.getAllDashboards().subscribe(
      (data) => {
        this.dashboards = data;

      },
      (error) => {
        console.error();
      },
      () => {
        this.load = true;
        console.log('done ');
      }
    );

  }

}
