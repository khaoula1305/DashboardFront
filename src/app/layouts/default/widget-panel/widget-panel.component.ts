import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardWidget } from 'src/app/models/dashboard-widget';
import { Widget } from 'src/app/models/widget.model';
import { DashboardWidgetService } from 'src/app/services/dashboard-widget.service';
import { WidgetsService } from 'src/app/services/widgets.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Dashboard } from 'src/app/models/dashboard.model';
import { DashboardsService } from '../../../services/dashboards.service';

@Component({
  selector: 'app-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.scss']
})
export class WidgetPanelComponent implements OnInit {

  @Output() hidden = new EventEmitter<any>();
  @Input() dashboard: Dashboard;
  widgets: Widget[];
  searchText;

  constructor( private widgetsService: WidgetsService, private dashboardsService: DashboardsService, private dashboardWidgetService: DashboardWidgetService, private router: Router) { }

  hideClick(){
    this.hidden.emit(true);
  }
  ngOnInit(): void {
    this.widgetsService.getAllWidgets().subscribe(
    (response) => {
    console.log('widgets ', response);
    this.widgets = response;
    },
    (error) => {
    console.log('error ' );
    },
    () => {
    console.log('complete');
    }
    );
    }

    // permet d'ajouter un widget de widget-panel au dashboard
  addItem(widget : Widget){
    let dashboardWidget:DashboardWidget=new DashboardWidget();
    dashboardWidget.title=widget.title;
    dashboardWidget.description=widget.description;
    dashboardWidget.rowValue=1;
    dashboardWidget.columnValue=1;
    dashboardWidget.maxItemCols=1;
    dashboardWidget.maxItemRows=1;
    dashboardWidget.xAxisValue=1;
    dashboardWidget.yAxisValue=2;
    dashboardWidget.widget=widget;
    dashboardWidget.dashboard=this.dashboard;
    console.log(dashboardWidget);
    this.dashboardWidgetService.addDashboardWidget(this.dashboard.id, dashboardWidget).subscribe(
      data => {
        console.log('success', data);
        this.dashboardWidgetService.getAllDashboardWidget(this.dashboard.id).subscribe(
          dssd=>{
            console.log('all widget', dssd);
          }
        )

      },
      error => {
        console.log(error);
      }
      );
    //pour actualiser le dashboard
    this.changeLocation(this.dashboard.id);
  }
  changeLocation(locationData) {

    // save current route first
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboards', locationData]); // navigate to same route
    });
  }
}
