import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CompactType, DisplayGrid, Draggable, GridType, PushDirections, Resizable} from 'angular-gridster2';
import { GridsterConfig, GridsterItem }  from 'angular-gridster2';
import { Dashboard } from 'src/app/models/dashboard.model';
import { DashboardsService } from 'src/app/services/dashboards.service';
import {DashboardWidgetService} from '../../../services/dashboard-widget.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardWidgetService: DashboardWidgetService, private route: ActivatedRoute, private widgetDashboardService: DashboardsService) { }
  options: GridsterConfig;
  dashboardgrid: Array<GridsterItem>;
  load = false;
  @Input() dashboard: Dashboard;

  public pauseState = false;

  static itemChange(item, itemComponent) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.info('itemResized', item, itemComponent);
  }

  ngOnInit() {
    this.dashboardWidgetService.getAllDashboardWidget().subscribe(
      (data) => {
        this.dashboardgrid = data;
    },
    (error) => {
    console.log('error ' );
    },
    () => {
      this.load = true;
    }
    );
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.OnDragAndResize,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false

    };


  }

  changedOptions() {
    this.options.api.optionsChanged();
  }
  onDeletedClick(evt, item){
   this.dashboardgrid.splice(this.dashboardgrid.indexOf(item), 1);
   console.log(item);
   console.log(evt);

   this.dashboardWidgetService.deleteDashboardWidget(item.id);

}
  removeItem(item) {
    this.dashboardgrid.splice(this.dashboardgrid.indexOf(item), 1);
  }

  addItem() {
   /*this.dashboard.forEach(el =>{
     if(el.cols)
   })*/
    this.dashboardgrid.push({cols: 2, rows: 2, y: 0, x: 0, resizeEnabled: true, dragEnabled: true});
  }
}
