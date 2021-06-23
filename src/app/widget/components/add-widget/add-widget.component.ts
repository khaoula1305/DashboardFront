import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Widget } from 'src/app/widget/models/widget.model';
import { WidgetTypeService } from 'src/app/widget/services/widget-type.service';
import { WidgetsService } from 'src/app/widget/services/widgets.service';
import { NgForm } from '@angular/forms';
import { GraphEnum, WidgetTypeEnum } from '../../models/widgetTypeEnum';
import { DashboardsService } from 'src/app/dashboard/services/dashboards.service';
import { Dashboard } from 'src/app/dashboard/models/dashboard.model';
import { DataSource } from 'src/app/data-source/models/data-source.model';
import { WidgetType } from '../../models/widget-type';
import { DataSourceService } from 'src/app/data-source/services/data-source.service';
import { Constants } from 'src/app/constants/constants';
import { SelectItem, SelectItemGroup } from 'primeng/api';

@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.scss'],
})
export class AddWidgetComponent implements OnInit {
  queries: DataSource[];
  widget: Widget = new Widget();
  title: string;
  description: string;
  widgetTypes: WidgetType[];
  widgetType: string;
  widgetTypeEnum = WidgetTypeEnum;
  graphEnum = GraphEnum;
  disableQueriesDropdown = false;
  dashboard: Dashboard;
  displayPopup: boolean;
  showButton = false;
  results: any;
  load = false;
  customTable: any;
  cols: any[] = [];
  filteredQueries: DataSource[];
  groupedQueries: SelectItemGroup[];
  items: SelectItem[];
  showButton1 = false;
  selectedItm: any;
  displayDescription = false;
  queryDescription: string;
  isQueryDetails: boolean;
  previousUrl: string;

  constructor(
    private dataSourceService: DataSourceService,
    private dashboardsService: DashboardsService,
    private widgetTypeService: WidgetTypeService,
    private widgetService: WidgetsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboard = this.dashboardsService.getCurretDashboard();
    this.widgetService.currentWidget.subscribe((widget) => {
      this.widget = widget;
    });

    const restItems = [];
    const qbItems = [];
    this.widget = new Widget();
    this.widget.metaDataSources = [];
    this.widgetService.changeWidget(this.widget);
    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        this.queries = data;
        data.forEach((elm) => {
          if (elm.type === Constants.restAPI) {
            restItems.push({
              label: elm.title,
              value: elm.id,
              additionalValue: 'rest.png',
            });
          } else if (elm.type === Constants.queryBuilder) {
            qbItems.push({
              label: elm.title,
              value: elm.id,
              additionalValue: 'QueryBuilder.png',
            });
          }
        });
        this.groupedQueries = [
          {
            label: Constants.restAPI,
            value: 'rest.png',
            items: restItems,
          },
          {
            label: Constants.queryBuilder,
            value: 'QueryBuilder.png',
            items: qbItems,
          },
        ];
      }
    );
  }
  // while user select Query => filter data Source and disable dropdown
  onSelectedQuery(): void  {
    this.showButton1 = true;
    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        this.widget.dataSource = data.find(elm => elm.id === this.selectedItm);
        if (this.widget.dataSource != null) { this.disableQueriesDropdown = true; }
            // widget types filter
        this.dataSourceService
    .getDataFrom(this.widget.dataSource)
    .subscribe((dataBody) => {
      if (dataBody.length >= 2 && Object.keys(dataBody[0]).length >= 2) {
        this.widgetTypeService.getAllWidgetTypes().subscribe(
          (dataType) => {
            this.widgetTypes = [];
            dataType.forEach((item) => {
              if (
                item.type === this.graphEnum.Bar ||
                item.type === this.graphEnum.Line ||
                item.type === this.graphEnum.Pie ||
                item.type === this.graphEnum.Doughnut ||
                item.type === this.widgetTypeEnum.Table ||
                item.type === this.widgetTypeEnum.Card
              ) {
                this.widgetTypes.push(item);
              }
            });
          }
        );
      } else if (dataBody.length === 1) {
        this.widgetTypeService.getAllWidgetTypes().subscribe(
          (dataType) => {
            this.widgetTypes = [];
            dataType.forEach((item) => {
              if (
                item.type === this.widgetTypeEnum.Card ||
                item.type === this.widgetTypeEnum.Table
              ) {
                this.widgetTypes.push(item);
              }
            });
          }
        );
      }
    });
    }
      );


    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        this.filteredQueries = [];
        data.forEach((elm) => {
          if (elm.type === Constants.queryBuilder){
            if (elm.associatedQuery === this.widget.dataSource.id){
              this.filteredQueries.push(elm);
            }
          }
        });
      });
  }

  onShowQueryDetails(dataSourceQuery: DataSource): void {
    this.showButton = true;
    this.dataSourceService
      .getDataFrom(dataSourceQuery)
      .subscribe((data) => {
        this.results = data;
        for (const key in this.results[0]) {
          if (Object.prototype.hasOwnProperty.call(this.results[0], key)) {
          this.cols.push({ field: key, header: key });
          }
        }
        this.customTable = [];
        this.cols.forEach((elm) => {
          this.customTable.push(elm.header);
        });
      });
  }

  showPopup(isDetail: boolean): void {
    this.displayPopup = true;
    this.results = [];
    this.cols = [];
    if (isDetail) {
      this.isQueryDetails = true;
      this.onShowQueryDetails(this.widget.dataSourceDetails);
    }
    else {
      this.isQueryDetails = false;
      this.onShowQueryDetails(this.widget.dataSource);
    }
  }

  showDescriptionDialog(): void {
    this.displayDescription = true;
    if (this.isQueryDetails) { this.queryDescription = this.widget.dataSourceDetails.description; }
    else { this.queryDescription = this.widget.dataSource.description; }
  }

  onSubmit(m: NgForm): void {
      this.widget.defaultItemCols = 2;
      this.widget.defaultItemRows = 2;
      this.widget.minItemCols = 1;
      this.widget.minItemRows = 1;
      this.widgetService.addWidget(this.widget).subscribe((result) => {
        if (this.dashboard != null) { this.router.navigate(['/dashboards', this.dashboard.id]); }
        else { this.router.navigateByUrl('/widgets'); }
      });
  }
}
