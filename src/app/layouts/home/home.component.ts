import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dashboard } from 'src/app/models/dashboard.model';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { DashboardWidgetService } from '../../services/dashboard-widget.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  dashboards: Dashboard[];
  load = false;
  dashboard: any;
  display: boolean = false;
  searchText: any;
  constructor(
    private dashboardService: DashboardsService,
    private router: Router,
    private dashboardWidgetService: DashboardWidgetService,
    private messageService: MessageService) { }

    showDialog() {
        this.display = true;
    }
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
      }
    );
  }
  updateDashboard(dashboard: Dashboard){
    this.router.navigate(['/updateDashboard',dashboard.id ]);
  }
  showConfirm(message: any) {
    this.messageService.clear();
    this.messageService.add(message);
}
onConfirm() {
  this.deleteDashboard(this.dashboard);
  this.messageService.clear('a');
}
onReject() {
  this.messageService.clear('a');
}
  deleteDashboard(dashboard: any){
    this.dashboardService.deleteDashboard(dashboard.id).subscribe(
      (result)=>{
        console.log(result);
      },
      (error)=>{
        console.log(error);
      },
      ()=>{
      this.router.navigateByUrl('/NewDashboard', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/']);
        });
      }
    );
  }
  onDelete(dashboard: Dashboard){
    this.dashboard=dashboard;
    this.dashboardWidgetService.getAllDashboardWidget(dashboard.id).subscribe(
      (data) => {
        if(data.length>0){
          this.showConfirm({key: 'a', sticky: true, severity:'warn', summary:'Dashboard is not empty', detail:' This will remove the dashboard and its associated widgets and cannot be undone!'});
        } else{
          this.showConfirm({key: 'a',  severity:'custom', summary:'Are you sure you want to remove this Dashboard?', detail:' !'});
        }
      }
    );
  }
  goToDashboard(dahsboard: Dashboard ){
    this.dashboardService.setCurrentDashboard(dahsboard);
    this.router.navigate(['dashboards', dahsboard.id]);
  }
}
