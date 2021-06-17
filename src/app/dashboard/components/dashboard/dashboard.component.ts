import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompactType,
  DisplayGrid,
  GridType,
  GridsterItem,
  GridsterConfig
} from 'angular-gridster2';
import { DashboardWidget } from 'src/app/dashboard-widget/models/dashboard-widget';
import { Dashboard } from 'src/app/dashboard/models/dashboard.model';
import { Widget } from 'src/app/widget/models/widget.model';
import { DashboardsService } from 'src/app/dashboard/services/dashboards.service';
import { MessageService } from 'primeng/api';
import { TeamsService } from 'src/app/team/services/team.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Table } from 'primeng/table';
import { Team } from 'src/app/team/models/team.model';
import { DashboardWidgetService } from 'src/app/dashboard-widget/services/dashboard-widget.service';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService],
})
export class DashboardComponent implements OnInit {
  constructor(
    private dashboardWidgetService: DashboardWidgetService,
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardsService,
    private messageService: MessageService,
    private teamService: TeamsService
  ) {}
  options: GridsterConfig;
  dashboardGridster: Array<GridsterItem> = [];
  dashboardOriginal: Array<GridsterItem>;
  add = false;
  load = false;
  editMode = false;
  searchText: any;
  searchDetail: any;
  empty = false;
  widgetDashboard;
  // Current dashboard
  @Input() dashboard: Dashboard;
  // Teams;
  teams: Team[];
  selectedTeam: Team;
  visibleSidebarDetail = false;
  selectedDashboardWidget: DashboardWidget;
  // Details
  results: any[];
  chartResults: any;
  cardResults: any;
  cols: any[];
  visibleSidebarCard = false;
  customTable: any;

  public pauseState = false;
  ngOnInit(): void {
    // initialize dashboard options
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
      minCols: 6,
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
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
    };
    // the ID of the DAshboard that will be displayed
    const id = this.route.snapshot.params.id;
    this.dashboardService.getDashboard(id).subscribe(
      (data) => {
        this.dashboard = data;
        if (data.team && data.team.title !== Constants.myDashboards) {
          this.selectedTeam = data.team;
        }
        // All widget inside
        this.dashboardWidgetService
          .getAllDashboardWidget(this.dashboard.id)
          .subscribe((dashWidgets) => {
            dashWidgets.forEach((elm) =>
              this.dashboardGridster.push({
                x: elm.xAxisValue,
                y: elm.yAxisValue,
                cols: elm.columnValue,
                rows: elm.rowValue,
                maxItemRows: elm.maxItemRows,
                minItemRows: elm.widget.minItemRows,
                maxItemCols: elm.maxItemCols,
                minItemCols: elm.widget.minItemCols,
                widgetdashboard: elm,
              })
            );
            // if Dashboard is empty
            this.empty = true;
          });
      },
      (error) => {},
      () => {
        this.load = true;
       }
    );
    this.teamService.getAllTeams().subscribe((data) => {
      this.teams = data.filter((team) => team.title !== Constants.myDashboards);
    });
  }
  // Hide widget panel
  onHiddenClick(state): void {
    this.add = false;
  }
  // show widget panel for adding widget
  addWidget(): void {
    this.add = true;
  }
  // Share Dash
  onRowSelect(): void {
    this.dashboard.team = this.selectedTeam;
    this.messageService.add({
      severity: 'info',
      summary: 'Dashboard is shared with ' + this.selectedTeam.title
    });
    this.dashboardService.updateDashboard(this.dashboard).subscribe();
  }
  // Refresh
  reload(): void {
    this.changeLocation(this.dashboard.id);
  }
  // Add Dashboard Widget
  onAddedClick(widget: Widget): void {
    const dashboardWidget: DashboardWidget = new DashboardWidget();
    dashboardWidget.maxItemCols = 4;
    dashboardWidget.maxItemRows = 4;
    dashboardWidget.title = widget.title;
    dashboardWidget.description = widget.description;
    dashboardWidget.dashboard = this.dashboard;
    dashboardWidget.widget = widget;
    dashboardWidget.rowValue = widget.defaultItemCols;
    dashboardWidget.columnValue = widget.defaultItemRows;
    let item: GridsterItem = {
      x: 0,
      y: 0,
      rows: dashboardWidget.rowValue,
      cols: dashboardWidget.columnValue,
    };
    item = this.options.api.getFirstPossiblePosition(item);
    dashboardWidget.xAxisValue = item.x;
    dashboardWidget.yAxisValue = item.y;
    this.dashboardGridster.push({
      x: item.x,
      y: item.y,
      cols: widget.defaultItemCols,
      rows: widget.defaultItemRows,
      widgetdashboard: dashboardWidget,
    });
    this.dashboardWidgetService
      .addDashboardWidget(this.dashboard.id, dashboardWidget)
      .subscribe((data) => {
        this.changeLocation(this.dashboard.id);
      });
  }
  changeLocation(locationData): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboards', locationData]); // navigate to same route
    });
  }
  // positionement
  onEdit(reset: boolean): void {
    if (!this.editMode) {
      this.dashboardOriginal = this.dashboardGridster.map((x) => ({ ...x }));
      this.options.draggable.enabled = true;
      this.options.resizable.enabled = true;
      this.options.displayGrid = DisplayGrid.Always;
      this.editMode = true;
    } else {
      this.options.draggable.enabled = false;
      this.options.resizable.enabled = false;
      this.options.displayGrid = DisplayGrid.None;
      this.editMode = false;
    }
    if (!reset) {
      this.changedOptions();
      this.updateDashboard();
    } else {
      this.dashboardGridster = this.dashboardOriginal.map((x) => ({ ...x }));
      this.changedOptions();
    }
  }
  // annuler le positionnement
  trackBy(index: number, item: GridsterItem): number {
    return item.id;
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  updateDashboard(): void {
    this.dashboardGridster.forEach((item) => {
      // widget will take new place
      item.widgetdashboard.xAxisValue = item.x;
      item.widgetdashboard.yAxisValue = item.y;
      item.widgetdashboard.columnValue = item.cols;
      item.widgetdashboard.rowValue = item.rows;
      this.dashboardWidgetService
        .updateDashboardWidget(this.dashboard.id, item.widgetdashboard)
        .subscribe();
    });
  }
  saveItemChanges(item: GridsterItem): void {
    item.widgetdashboard.xAxisValue = item.x;
    item.widgetdashboard.yAxisValue = item.y;
    item.widgetdashboard.columnValue = item.cols;
    item.widgetdashboard.rowValue = item.rows;
    this.options.api.optionsChanged();
    this.dashboardWidgetService
      .updateDashboardWidget(this.dashboard.id, item.widgetdashboard)
      .subscribe((result) => console.log('save item change ', result));
  }
  deleteWidget(item): void {
    this.dashboardGridster.splice(this.dashboardGridster.indexOf(item), 1);
    this.dashboardWidgetService
      .deleteDashboardWidget(this.dashboard.id, item.widgetdashboard)
      .subscribe();
    this.options.api.optionsChanged();
  }
  onDeletedClick(evt, item): void {
    this.widgetDashboard = item;
    this.showConfirm({
      key: 'a',
      severity: 'custom',
      summary: 'Are you sure you want to remove this widget?',
    });
  }
  showConfirm(message: any): void {
    this.messageService.clear();
    this.messageService.add(message);
  }
  onConfirm(): void {
    this.messageService.clear('a');
    this.messageService.clear('b');
    this.deleteWidget(this.widgetDashboard);
  }
  deleteDashboard(): void {
    this.dashboardService.deleteDashboard(this.dashboard.id).subscribe(
      (result) => {
      },
      (error) => {
      },
      () => {
        this.router
          .navigateByUrl('/NewDashboard', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/']);
          });
      }
    );
  }
  onReject(): void {
    this.messageService.clear('b');
    this.messageService.clear('a');
  }
  onShowDetails(event, dashboardwidget): void {
    this.selectedDashboardWidget = dashboardwidget;
    this.visibleSidebarDetail = true;
    this.results = event[0];
    this.chartResults = event[1];
    this.cardResults = event[1];
  }
  showDetails(event): void {
    this.results = event;
    this.cols = [];
    for (const key in this.results[0]) {
      if (Object.prototype.hasOwnProperty.call(this.results[0], key)) {
      this.cols.push({ key, label: key });
      }
    }
    this.visibleSidebarCard = true;
    this.customTable = [];
    this.cols.forEach(elm => {
      this.customTable.push(elm.key);
    });
  }

  onExportPdf(): void {
    const pdf = new jsPDF();
    pdf.text(Constants.pdfTitle, Constants.coordX, Constants.coordY);
    pdf.setFontSize(Constants.fontSize);
    pdf.setTextColor(Constants.textColor);
    const headers = [];
    const object = [];
    this.cols.forEach((elm) => {
      object.push(elm.label);
    });
    const content = [];
    this.results.forEach((item) => {
      const obj = [];
      this.cols.forEach((elm) => {
        obj.push(item[elm.key]);
      });
      content.push(obj);
    });
    headers[0] = object;
    (pdf as any).autoTable({
      head: headers,
      body: content,
      theme: 'plain',
    });
    pdf.save(Constants.pdfTitle + '.pdf');
  }
  clear(table: Table): void {
    table.clear();
}
}
