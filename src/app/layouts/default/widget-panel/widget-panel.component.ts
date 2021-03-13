import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Widget } from 'src/app/models/widget.model';
import { DashboardWidgetService } from 'src/app/services/dashboard-widget.service';
import { WidgetsService } from 'src/app/services/widgets.service';

@Component({
  selector: 'app-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.scss']
})
export class WidgetPanelComponent implements OnInit {

  @Output() hidden = new EventEmitter<any>();
  widgets: Widget[];
 searchText;

  constructor( private widgetsService: WidgetsService, private widgetDashboardService: DashboardWidgetService) { }

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

  addWidget(widget : Widget){
    //this.widgetDashboardService.addWidget({cols: 2, rows: 2, y: 0, x: 0, resizeEnabled:true, dragEnabled:true, type: widget.type});
  }
  addItem() {
    //this.widgetDashboardService.addWidget({cols: 2, rows: 2, y: 0, x: 0, resizeEnabled:true, dragEnabled:true});
   }

}
