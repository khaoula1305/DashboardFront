import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardWidget } from 'src/app/models/dashboard-widget';
import { Widget } from 'src/app/models/widget.model';
import { DashboardWidgetService } from 'src/app/services/dashboard-widget.service';
import { WidgetsService } from 'src/app/services/widgets.service';
import { Dashboard } from 'src/app/models/dashboard.model';
import { DashboardsService } from '../../../services/dashboards.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.scss']
})
export class WidgetPanelComponent implements OnInit {
  @Output() added = new EventEmitter<any>();
  @Output() hidden = new EventEmitter<any>();
  widgets: Widget[];
  searchText;
  constructor( private widgetsService: WidgetsService, private router: Router) { }
  hideClick(){
    this.hidden.emit(true);
  }
  ngOnInit(): void {
    this.widgetsService.getAllWidgets().subscribe(
    (response) => {
      this.widgets = response;
    }
    );
    }
    addClick(widget: Widget ){
      this.added.emit(widget);
    }
}
