import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardWidget } from 'src/app/models/dashboard-widget';
import { WidgetType } from 'src/app/models/widget-type';
import { DashboardWidgetService } from 'src/app/services/dashboard-widget.service';
import { WidgetTypeService } from 'src/app/services/widget-type.service';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { DataSource } from 'src/app/models/data-source.model';
import { DataSourceService } from 'src/app/services/data-source.service';
import { DashboardsService } from 'src/app/services/dashboards.service';


@Component({
  selector: 'app-widget-configuration',
  templateUrl: './widget-configuration.component.html',
  styleUrls: ['./widget-configuration.component.scss']
})

export class WidgetConfigurationComponent implements OnInit {

  queries: DataSource[];
  selectedQuery: DataSource;
  dashWidget: DashboardWidget;
  load: boolean=false;
  basicData;

  widgetTypes: WidgetType[];
  selectedWidgetType: WidgetType;
  type;
  //chart
  dimension ;
  mesure2 ;
  mesure1;
  results;
  addWidget: boolean= false;
  constructor(private route: ActivatedRoute, 
              private dashboardWidgetService: DashboardWidgetService , 
              private dashboardsService: DashboardsService , 
              private dataSourceService: DataSourceService, 
              private widgetTypeService: WidgetTypeService,
              private router: Router) 
              {}

  ngOnInit(): void {
    const title = this.route.snapshot.params.title;
     
    this.widgetTypeService.getAllWidgetTypes().subscribe(
      (data)=>{
        this.widgetTypes=data;

      },
      (error)=>{
        console.log('getAllWidgetTypes error');
      },
      ()=>{
        // done
      }
    );
  }
onSubmit(m: NgForm) {
  if ( m.untouched || m.invalid) {
    alert('Required');
  } else {
    this.dashWidget.title = m.value.title;
    this.dashWidget.description= m.value.description;
    this.dashboardWidgetService.updateDashboardWidget(this.dashWidget.dashboard.id, this.dashWidget);
  }
}
}
