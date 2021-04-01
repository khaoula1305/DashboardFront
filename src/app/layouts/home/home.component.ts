import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private dashboardService: DashboardsService, private router: Router) { }

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
  updateDashboard(dashboardId: Dashboard){
    this.router.navigate(['/updateDashboard',dashboardId ]);
  }
  deleteDashboard(dashboardId: Dashboard){
    this.dashboardService.deleteDashboard(dashboardId).subscribe(
      (data)=>{
        console.log(data);
      },
      (error)=>{
        console.log('delete dashboard error');
      },
      ()=>{
        //window.location.reload();
      this.router.navigateByUrl('/NewDashboard', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/']); 
        });
      }
    );
  }

}
