import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CompactType, DisplayGrid, Draggable, GridsterItemComponent, GridType, PushDirections, Resizable} from 'angular-gridster2';
import { GridsterConfig, GridsterItem }  from 'angular-gridster2';
import { DashboardWidget } from 'src/app/models/dashboard-widget';
import { Dashboard } from 'src/app/models/dashboard.model';
import { Widget } from 'src/app/models/widget.model';
import { DashboardsService } from 'src/app/services/dashboards.service';
import {DashboardWidgetService} from '../../../services/dashboard-widget.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardWidgetService: DashboardWidgetService, 
    private route: ActivatedRoute, 
    private dashboardService: DashboardsService,
    private widgetDashboardService: DashboardsService) { }
  options: GridsterConfig;
  dashboardGridster: Array<GridsterItem>= [];
  dashboardOriginal: Array<GridsterItem>;
  add=false;
  load = false;
  editMode= false;
  searchText:any;
  @Input() dashboard: Dashboard;

  public pauseState = false;
  ngOnInit() {
    this.options = {
      gridType: GridType.ScrollVertical,
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
     const id = this.route.snapshot.params.id;
    this.dashboardService.getDashboard(id).subscribe(
      data => {
        this.dashboard = data;
        this.dashboardWidgetService.getAllDashboardWidget(this.dashboard.id).subscribe(
          (dashwidget) => {
            dashwidget.forEach( elm=> this.dashboardGridster.push({x: elm.xAxisValue, y: elm.yAxisValue, cols:elm.columnValue, rows:elm.rowValue, widgetdashboard: elm}) ) 
        });
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.load=true;
      }
    );
  }
  onHiddenClick(state){
  this.add = false;
}
  addWidget(){
    this.add = true;
  }
  onAddedClick(widget : Widget){
    let dashboardWidget: DashboardWidget=new DashboardWidget();
    // ToBeImplemented
    widget.defaultItemCols=2;
    widget.defaultItemRows=2;
    dashboardWidget.title=widget.title;
    dashboardWidget.description=widget.description;
    dashboardWidget.dashboard=this.dashboard;
    dashboardWidget.widget=widget;
    //ToBeImblemented
    dashboardWidget.rowValue=   widget.defaultItemCols;
    dashboardWidget.columnValue= widget.defaultItemRows;
    dashboardWidget.maxItemCols=1;
    dashboardWidget.maxItemRows=1;
    let item: GridsterItem 
    item=this.options.api.getLastPossiblePosition(item);
    dashboardWidget.xAxisValue=item.x;
    dashboardWidget.yAxisValue=item.y;
    this.dashboardGridster.push({x: item.x, y : item.y, cols : widget.defaultItemCols, rows: widget.defaultItemRows, widgetdashboard: dashboardWidget});
    this.dashboardWidgetService.addDashboardWidget(this.dashboard.id, dashboardWidget).subscribe();
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
      this.dashboardWidgetService.updateDashboardWidget(this.dashboard.id, item.widgetdashboard).subscribe();
    });
  }
  saveItemChanges(item: GridsterItem) {
    item.widgetdashboard.xAxisValue= item.x;
    item.widgetdashboard.yAxisValue= item.y;
    item.widgetdashboard.columnValue= item.cols;
    item.widgetdashboard.rowValue= item.rows;
    this.options.api.optionsChanged();
    this.dashboardWidgetService.updateDashboardWidget(this.dashboard.id, item.widgetdashboard).subscribe(
      result => console.log('save item change ', result)
       );
  }
  onDeletedClick(evt , item){
   this.dashboardGridster.splice(this.dashboardGridster.indexOf(item), 1);
   this.dashboardWidgetService.deleteDashboardWidget(this.dashboard.id,item.widgetdashboard).subscribe();
}
}
