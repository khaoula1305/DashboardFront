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
                  item.type == this.graphEnum.Bar ||
                  item.type == this.graphEnum.Line ||
                  item.type == this.graphEnum.Pie ||
                  item.type == this.widgetTypeEnum.Table ||
                  item.type == this.widgetTypeEnum.Card

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
                if (item.type == this.widgetTypeEnum.Card || item.type == this.widgetTypeEnum.Table)
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

  onSelectedQueryDetails() {

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
