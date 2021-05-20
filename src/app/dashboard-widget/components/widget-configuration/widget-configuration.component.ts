import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardWidget } from 'src/app/dashboard-widget/models/dashboard-widget';
import { WidgetTypeService } from 'src/app/widget/services/widget-type.service';
import { NgForm } from '@angular/forms';
import { DashboardsService } from 'src/app/dashboard/services/dashboards.service';

import { WidgetsService } from 'src/app/widget/services/widgets.service';
import { Dashboard } from 'src/app/dashboard/models/dashboard.model';
import { DashboardWidgetService } from '../../services/dashboard-widget.service';
import { WidgetTypeEnum } from 'src/app/widget/models/widgetTypeEnum';
import { WidgetType } from 'src/app/widget/models/widget-type';
import { Widget } from 'src/app/widget/models/widget.model';
@Component({
  selector: 'app-widget-configuration',
  templateUrl: './widget-configuration.component.html',
  styleUrls: ['./widget-configuration.component.scss'],
})
export class WidgetConfigurationComponent implements OnInit {
  currentDashboard: Dashboard;
  dashboardWidget: DashboardWidget;
  load: boolean = false;
  widgetTypeEnum = WidgetTypeEnum;
  widgetTypes: WidgetType[];
  widget: Widget;

  constructor(
    private route: ActivatedRoute,
    private dashboardWidgetService: DashboardWidgetService,
    private dashboardsService: DashboardsService,
    private widgetTypeService: WidgetTypeService,
    private widgetService: WidgetsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.widget = new Widget();
    this.widgetService.changeWidget(this.widget);
    const id = this.route.snapshot.params.title;
    this.currentDashboard = this.dashboardsService.getCurretDashboard();
    this.widgetService.currentWidget.subscribe(
      (widget) => {
        this.widget = widget;
      }
    );
    this.dashboardWidgetService
      .getAllDashboardWidget(this.currentDashboard.id)
      .subscribe((data) => {
        this.dashboardWidget = data.find((e) => e.id == id);
        this.widget = this.dashboardWidget.widget;
        this.widgetService.changeWidget(this.widget);
      },
        (err) => console.log(err),
        () => this.load = true);


    this.widgetTypeService.getAllWidgetTypes().subscribe(
      (data) => {
        //filter to be implemented
        this.widgetTypes = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit(m: NgForm) {
    this.dashboardWidget.widget = this.widget;
    this.dashboardWidgetService
      .updateDashboardWidget(
        this.currentDashboard.id,
        this.dashboardWidget
      )
      .subscribe((result) => {
        this.router.navigate(['/dashboards', this.currentDashboard.id]);
      });
  }
}
