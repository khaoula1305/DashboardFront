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
  dashboardGridster: Array<GridsterItem>= [];
  dashboardOriginal: Array<GridsterItem>;
  load = false;
  editMode= false;
  searchText:any;
  @Input() dashboard: Dashboard;

  public pauseState = false;
  static itemChange(item, itemComponent) {
    console.info('itemChanged', item, itemComponent);
  }
  static itemResize(item, itemComponent) {
    console.info('itemResized', item, itemComponent);
  }
  ngOnInit() {
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
        enabled: false,
      },
      resizable: {
        enabled: false,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };
    this.dashboardWidgetService.getAllDashboardWidget(this.dashboard.id).subscribe(
      (data) => {
         data.forEach( elm=> this.dashboardGridster.push({x: elm.xAxisValue, y: elm.yAxisValue, cols:elm.columnValue, rows:elm.rowValue, widgetdashboard: elm}) ) 
    },
    (error) => {
    console.log('error ' );
    },
    () => {
      this.load = true;
    }
    );
  }
  OnEdit(reset: boolean){
    if(!this.editMode ){
      this.dashboardOriginal = this.dashboardGridster.map(x => ({...x}));
      this.options.draggable.enabled=true;
      this.options.resizable.enabled=true;
      this.options.displayGrid= DisplayGrid.Always;
      this.editMode=true;
    }
    else{
      this.options.draggable.enabled=false;
      this.options.resizable.enabled=false;
      this.options.displayGrid= DisplayGrid.None;
      this.editMode=false;
    }
    if(!reset){
      this.changedOptions();
      this.updateDashboard();
    }
    else{
      this.dashboardGridster = this.dashboardOriginal.map(x => ({...x}));
    }
  }
  trackBy(index: number, item: GridsterItem): number {
    return item.id;
  }
  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }
  updateDashboard(){
    this.dashboardGridster.forEach(item => { 
      item.widgetdashboard.xAxisValue= item.x;
      item.widgetdashboard.yAxisValue= item.y;
      item.widgetdashboard.columnValue= item.cols;
      item.widgetdashboard.rowValue= item.rows;
      this.dashboardWidgetService.updateDashboardWidget(this.dashboard.id, item.widgetdashboard).subscribe(
        result => console.log('result ', result)
         );
    });
  }
  saveItemChanges(item: GridsterItem) {
    item.widgetdashboard.xAxisValue= item.x;
    item.widgetdashboard.yAxisValue= item.y;
    item.widgetdashboard.columnValue= item.cols;
    item.widgetdashboard.rowValue= item.rows;
    this.options.api.optionsChanged();
    this.dashboardWidgetService.updateDashboardWidget(this.dashboard.id, item.widgetdashboard).subscribe(
      result => console.log('result ', result)
       );
  }
  onDeletedClick(evt , item){
   this.dashboardGridster.splice(this.dashboardGridster.indexOf(item), 1);
   this.dashboardWidgetService.deleteDashboardWidget(this.dashboard.id,item.widgetdashboard).subscribe(data => {
    console.log(data);
  },
  error => {
    console.log(error);
  }
  );
}
}
