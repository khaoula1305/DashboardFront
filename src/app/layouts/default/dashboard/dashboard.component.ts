import { Component, OnInit } from '@angular/core';
import {CompactType, DisplayGrid, Draggable, GridType, PushDirections, Resizable} from 'angular-gridster2';
import { GridsterConfig, GridsterItem }  from 'angular-gridster2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  static itemChange(item, itemComponent) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.info('itemResized', item, itemComponent);
  }
  constructor() { }
  ngOnInit() {
    this.options = {
      /*itemChangeCallback: DefaultComponent.itemChange,
      itemResizeCallback: DefaultComponent.itemResize,*/
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
    let widgets: Array<any>=new Array();
    
    //call service pour ramener les widgets à partir la partie Back
    widgets= [
      {cols: 2, rows: 1, y: 0, x: 0, resizeEnabled:true, dragEnabled:true, label:"hello"},
      {cols: 2, rows: 2, y: 0, x: 2, resizeEnabled:true, dragEnabled:true},
      {cols: 1, rows: 1, y: 1, x: 1, resizeEnabled:true, dragEnabled:true}
    ];

    this.dashboard=widgets;
    //this.dashboard =
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  public pauseState = false;
  onDeletedClick(item){
  // this.pauseState = state;
   this.dashboard.splice(this.dashboard.indexOf(item), 1);

}
  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
   /*this.dashboard.forEach(el =>{
     if(el.cols)
   })*/
    this.dashboard.push({cols: 1, rows: 1, y: 0, x: 0, resizeEnabled:true, dragEnabled:true});
  }
}
