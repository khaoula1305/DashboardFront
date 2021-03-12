import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Widget } from 'src/app/models/widget.model';
import { WidgetDashboardService } from 'src/app/services/widget-dashboard.service';
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

  constructor( private widgetsService: WidgetsService, private widgetDashboardService: WidgetDashboardService) { }

  hideClick(){
    console.log('widget ');
    this.hidden.emit(true);
  }

  DoSth(evt : any){
    console.log('Hi', evt )
  }

  ngOnInit(): void {
    this.widgets=this.widgetsService.getAllWidgets();
    console.log('widget panel', this.widgets);
  }

  addWidget(widget : Widget){
    this.widgetDashboardService.addWidget({cols: 2, rows: 2, y: 0, x: 0, resizeEnabled:true, dragEnabled:true, type: widget.type});
  }
  addItem() {
    this.widgetDashboardService.addWidget({cols: 2, rows: 2, y: 0, x: 0, resizeEnabled:true, dragEnabled:true});
   }
}
