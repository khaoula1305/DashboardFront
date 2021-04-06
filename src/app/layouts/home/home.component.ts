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
  dashboardId: any;
  constructor(
    private dashboardService: DashboardsService, 
    private router: Router, 
    private dashboardWidgetService: DashboardWidgetService,
    private messageService: MessageService) { }

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
  updateDashboard(dashboard: Dashboard){
    this.router.navigate(['/updateDashboard',dashboard.id ]);
  }
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'a', sticky: true, severity:'warn', summary:'Dashboard is not empty', detail:'Confirm to proceed'});
}
onConfirm() {
  this.deleteDashboard(this.dashboardId);
  this.messageService.clear('a');
}

onReject() {
  this.messageService.clear('a');
}
  deleteDashboard(dashboardID: any){
    this.dashboardService.deleteDashboard(dashboardID).subscribe(
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
    this.dashboardWidgetService.getAllDashboardWidget(dashboard.id).subscribe(
      (data) => {
        if(data.length>0){
          this.dashboardId=dashboard.id;
          this.showConfirm();
        } else{
          this.deleteDashboard(dashboard.id); 
        }
      }
    );
  }
  goToDashboard(dahsboard: Dashboard ){
    this.dashboardService.setCurrentDashboard(dahsboard);
    this.router.navigate(['dashboards', dahsboard.id]); 
  }
}
