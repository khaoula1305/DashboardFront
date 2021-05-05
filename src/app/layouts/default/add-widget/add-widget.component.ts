import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WidgetType } from 'src/app/models/widget-type';
import { Widget } from 'src/app/models/widget.model';
import { WidgetTypeService } from 'src/app/services/widget-type.service';
import { WidgetsService } from 'src/app/services/widgets.service';
import { NgForm } from '@angular/forms';
import { DataSource } from 'src/app/models/data-source.model';
import { DataSourceService } from 'src/app/services/data-source.service';
import { WidgetTypeEnum } from '../../../models/widgetTypeEnum';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { Dashboard } from 'src/app/models/dashboard.model';

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
  disableQueriesDropdown = false;
  dashboard: Dashboard;

  constructor(
    private dataSourceService: DataSourceService,
    private dashboardsService: DashboardsService,
    private widgetTypeService: WidgetTypeService,
    private widgetService: WidgetsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboard= this.dashboardsService.getCurretDashboard();
    this.widget = new Widget();
    this.widgetService.changeWidget(this.widget);
    this.widgetService.currentWidget.subscribe((widget) => {
      widget.metaDataSources = [];
      this.widget = widget;
    });
    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        this.queries = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSelectedQuery() {
    if (this.widget.dataSource != null) this.disableQueriesDropdown = true;
    //widget types filter
    this.dataSourceService
      .getDataFrom(this.widget.dataSource)
      .subscribe((dataBody) => {
        if (dataBody.length >= 2 && Object.keys(dataBody[0]).length >= 2) {
          this.widgetTypeService.getAllWidgetTypes().subscribe(
            (data) => {
              this.widgetTypes = [];
              data.forEach((item) => {
                if (
                  item.type == 'bar' ||
                  item.type == 'line' ||
                  item.type == 'pie' ||
                  item.type == 'table' ||
                  item.type == 'card' 

                )
                  this.widgetTypes.push(item);
              });
            },
            (error) => {
              console.log(error);
            }
          );
        } else if (dataBody.length == 1) {
          this.widgetTypeService.getAllWidgetTypes().subscribe(
            (data) => {
              this.widgetTypes = [];
              data.forEach((item) => {
                if (item.type == 'card' || item.type == 'table')
                  this.widgetTypes.push(item);
              });
            },
            (error) => {
              console.log(error);
            }
          );
        }
      });
  }

  onSubmit(m: NgForm) {
    if (m.untouched || m.invalid) {
      alert('Required');
    } else {
      this.widget.defaultItemCols = 2;
      this.widget.defaultItemRows = 2;
      this.widget.minItemCols = 1;
      this.widget.minItemRows = 1;
      this.widgetService.addWidget(this.widget).subscribe((result) => {
        this.router.navigate(['/dashboards', this.dashboard.id]);
      });
    }
  }
}
