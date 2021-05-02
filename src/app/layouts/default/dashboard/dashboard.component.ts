import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {CompactType, DisplayGrid, Draggable, GridsterItemComponent, GridType, PushDirections, Resizable} from 'angular-gridster2';
import { GridsterConfig, GridsterItem }  from 'angular-gridster2';
import { DashboardWidget } from 'src/app/models/dashboard-widget';
import { Dashboard } from 'src/app/models/dashboard.model';
import { Widget } from 'src/app/models/widget.model';
import { DashboardsService } from 'src/app/services/dashboards.service';
import {DashboardWidgetService} from '../../../services/dashboard-widget.service';
import {Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService]

})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardWidgetService: DashboardWidgetService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private dashboardService: DashboardsService,
    private widgetDashboardService: DashboardsService,
    private messageService: MessageService) { }
  options: GridsterConfig;
  dashboardGridster: Array<GridsterItem>= [];
  dashboardOriginal: Array<GridsterItem>;
  add=false;
  load = false;
  editMode= false;
  searchText:any;
  empty: false;
  widgetDashboard;
  @Input() dashboard: Dashboard;
  visibleSidebar=false;
  selectedDashboardWidget: DashboardWidget;

  public pauseState = false;
  ngOnInit() {
    setTimeout(function() { this.empty = true;}.bind(this), 2000);
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
      maxCols: 10,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 5,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 250,
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
            dashwidget.forEach( elm=> this.dashboardGridster.push(
              { x: elm.xAxisValue, 
                y: elm.yAxisValue, 
                cols:elm.columnValue, 
                rows:elm.rowValue, 
                maxItemRows: elm.maxItemRows,
                minItemRows: elm.widget.minItemRows,
                maxItemCols: elm.maxItemCols,
                minItemCols: elm.widget.minItemCols,
                widgetdashboard: elm}) ) 
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
    dashboardWidget.maxItemCols=4;
    dashboardWidget.maxItemRows=4;
    dashboardWidget.title=widget.title;
    dashboardWidget.description=widget.description;
    dashboardWidget.dashboard=this.dashboard;
    dashboardWidget.widget=widget;
    dashboardWidget.rowValue=widget.defaultItemCols;
    dashboardWidget.columnValue=widget.defaultItemRows;
    let item: GridsterItem ={x:0, y:0, rows: dashboardWidget.rowValue, cols:  dashboardWidget.columnValue};
    item=this.options.api.getFirstPossiblePosition(item);
    dashboardWidget.xAxisValue=item.x;
    dashboardWidget.yAxisValue=item.y;
    this.dashboardGridster.push({x: item.x, y : item.y, cols : widget.defaultItemCols, rows: widget.defaultItemRows, widgetdashboard: dashboardWidget});
    this.dashboardWidgetService.addDashboardWidget(this.dashboard.id, dashboardWidget).subscribe(
      (data)=>{
        this.changeLocation(this.dashboard.id);
      }
    );

  }
  changeLocation(locationData) {
    // save current route first
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboards', locationData]); // navigate to same route
    });
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
      this.changedOptions();
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
      // add isEqual function
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
  deleteWidget( item){
   this.dashboardGridster.splice(this.dashboardGridster.indexOf(item), 1);
   this.dashboardWidgetService.deleteDashboardWidget(this.dashboard.id,item.widgetdashboard).subscribe();
   this.options.api.optionsChanged();
}
onDeletedClick(evt, item){
  this.widgetDashboard=item;
  this.showConfirm({key: 'a',  severity:'custom', summary:'Are you sure you want to remove this widget?'});
//this.showConfirm({key: 'a', sticky: true, severity:'custom', summary:'Are you sure you want to remove this widget?', detail:' !'});
}
showConfirm(message: any) {
  this.messageService.clear();
  this.messageService.add(message);
}
onConfirm() {
this.messageService.clear('a');
this.messageService.clear('b');
this.deleteWidget(this.widgetDashboard);
}
deleteDashboard(){
  this.dashboardService.deleteDashboard(this.dashboard.id).subscribe(
    (result)=>{
      console.log(result);
    },
    (error)=>{
      console.log(error);
    },
    ()=>{
    this.router.navigateByUrl('/NewDashboard', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/']); 
      });
    }
  );
}
onReject() {
this.messageService.clear('b');
this.messageService.clear('a');
}
OnDelete(){
  this.showConfirm({key: 'b',  severity:'custom', summary:'Are you sure you want to remove this Dashboard?'});
}
onShowDetails(evt, item) {
  this.selectedDashboardWidget=item;
  this.visibleSidebar = true;
  console.log('selectedDashboardWidget', this.selectedDashboardWidget);
}
}
