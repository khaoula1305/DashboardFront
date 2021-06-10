import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dashboard } from 'src/app/dashboard/models/dashboard.model';
import { DashboardsService } from 'src/app/dashboard/services/dashboards.service';
import { DashboardWidgetService } from 'src/app/dashboard-widget/services/dashboard-widget.service';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class DashboardListComponent implements OnInit {
  dashboards: Dashboard[];
  load = false;
  dashboard: any;
  display = false;
  searchText: any;
  constructor(
    private dashboardService: DashboardsService,
    private router: Router,
    private dashboardWidgetService: DashboardWidgetService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

    showDialog(): void {
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
  updateDashboard(dashboard: Dashboard): void {
    this.router.navigate(['updateDashboard', dashboard.id ]);
  }
  onDelete(dashboard: Dashboard): void {
    let message;
    this.dashboardWidgetService.getAllDashboardWidget(dashboard.id).subscribe(
      (data) => {
        if (data.length > 0){
        message = 'This will remove the dashboard and its associated widgets and cannot be undone!';
        } else{
          message = 'Are you sure you want to remove this Dashboard?';
        }
        this.confirmationService.confirm({
          message,
          header: 'Delete Confirmation',
          icon: 'pi pi-info-circle',
          accept: () => {
            this.dashboardService.deleteDashboard(dashboard.id).subscribe(
              (result) => {
                this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Dashboard deleted'});
              },
              (error) => {
                this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'Dashboard not deleted'});
              },
              () => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/dashboards']);
                });
              }
            );
          },
          reject: (type) => {
              switch (type) {
                  case ConfirmEventType.REJECT:
                      this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
                      break;
                  case ConfirmEventType.CANCEL:
                      this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
                      break;
              }
          }
      });
      }
    );
  }
  goToDashboard(dahsboard: Dashboard): void {
    this.dashboardService.setCurrentDashboard(dahsboard);
    this.router.navigate(['dashboards', dahsboard.id]);
  }

}
