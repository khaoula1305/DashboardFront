import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardWidget } from 'src/app/models/dashboard-widget';
import { Widget } from 'src/app/models/widget.model';
import { DashboardWidgetService } from 'src/app/services/dashboard-widget.service';
import { WidgetsService } from 'src/app/services/widgets.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.scss']
})
export class WidgetPanelComponent implements OnInit {

  @Output() hidden = new EventEmitter<any>();
  widgets: Widget[];
  searchText;

  constructor( private widgetsService: WidgetsService, private dashboardWidgetService: DashboardWidgetService) { }

  hideClick(){
    console.log('widget ');
    this.hidden.emit(true);
  }

  DoSth(evt : any){
    console.log('Hi', evt )
  }

  ngOnInit(): void {
    this.widgetsService.getAllWidgets().subscribe(
    (response) => {
    console.log('widgets ', response);
    this.widgets=response;
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
    debugger
    let dashboardWidget:DashboardWidget=new DashboardWidget();
    console.log(widget);
    console.log(widget.title);

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
    //this.dashboardWidgetService.getAllDashboardWidget();
    this.dashboardWidgetService.getAllDashboardWidget().subscribe(
      (data)=>{
        console.log("lst modifs" + data);
      }
    )
  }
  // permet d'ajouter un nouveau widget generique
  addWidget() {
    //this.widgetDashboardService.addWidget({cols: 2, rows: 2, y: 0, x: 0, resizeEnabled:true, dragEnabled:true});
   }

}
