import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardWidget } from 'src/app/models/dashboard-widget';
import { Widget } from 'src/app/models/widget.model';
import { DashboardWidgetService } from 'src/app/services/dashboard-widget.service';
import { WidgetsService } from 'src/app/services/widgets.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.scss']
})
export class WidgetPanelComponent implements OnInit {

  @Output() hidden = new EventEmitter<any>();
  widgets: Widget[];
  searchText;

  constructor( private widgetsService: WidgetsService, private dashboardWidgetService: DashboardWidgetService, private router: Router) { }

  hideClick(){
    this.hidden.emit(true);
  }
  ngOnInit(): void {
    this.widgetsService.getAllWidgets().subscribe(
    (response) => {
    console.log('widgets ', response);
    this.widgets = response;
    console.log("widget type heloo", this.widgets[0].widgetType);
    },
    (error) => {
    console.log('error ' );
    },
    () => {
    console.log('complete');
    }
    );
    }

    // permet d'ajouter un widget de widget-panel dans le dashboard
  addItem(widget : Widget){
    let dashboardWidget:DashboardWidget=new DashboardWidget();

   // dashboardWidget.id=5;

    dashboardWidget.title=widget.title;
    dashboardWidget.description=widget.description;
    dashboardWidget.widget=widget;
    dashboardWidget.x=1;
    dashboardWidget.y=1;
    dashboardWidget.cols=1;
    dashboardWidget.rows=1;
    dashboardWidget.dataSource=null;
    dashboardWidget.dashboard=null;

    console.log(dashboardWidget);
    this.dashboardWidgetService.addDashboardWidget(dashboardWidget);
    //pour actualiser le dashboard
    this.changeLocation('Dash 2');
   // window.location.reload();
  }
  changeLocation(locationData) {

    // save current route first
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboards', locationData]); // navigate to same route
    });
  }
}
