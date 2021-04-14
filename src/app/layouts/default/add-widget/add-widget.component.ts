import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WidgetType } from 'src/app/models/widget-type';
import { Widget } from 'src/app/models/widget.model';
import { WidgetTypeService } from 'src/app/services/widget-type.service';
import { WidgetsService } from 'src/app/services/widgets.service';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { DataSource } from 'src/app/models/data-source.model';
import { DataSourceService } from 'src/app/services/data-source.service';
import { WidgetTypeEnum } from '../../../models/widgetTypeEnum';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { MetaDataSource } from 'src/app/models/meta-data-source.model';
import { UUID } from 'angular2-uuid';
@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.scss']
})
export class AddWidgetComponent implements OnInit {
  basicData;
  queries: DataSource[];
  selectedQuery: DataSource; 
  widget: Widget = new Widget();
  title: string;
  description: string;
  widgetTypes: WidgetType[];
  selectedWidgetType: WidgetType;
  widgetType: string;
  widgetTypeEnum = WidgetTypeEnum;

  //chart
  labels: any[]=[];
  datasets: any[] = [];
  // ToBeImplemented
  dimension = [];
  mesure2 = [];
  mesure1 = [];
  results = [];

  showQueries = false;
  showKeys = false;
  allKeys: MetaDataSource[]=[];
  selectedKeys: MetaDataSource[]=[];
  preview=false;
  labelsWrited=false;
  drawType=false;
  dimensionKey: MetaDataSource;
  isGraph= false;
  isTable = false;
  isDimension;
  oldValue:string;

  constructor(
    private dataSourceService: DataSourceService,
    private dashboardsService: DashboardsService,
    private widgetTypeService: WidgetTypeService,
    private widgetService: WidgetsService,
    private router: Router) { }


  ngOnInit(): void {
    this.widgetTypeService.getAllWidgetTypes().subscribe(
      (data) => {
        this.widgetTypes = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  OnSelectedWidgetType() {
    //this.showQueries = true;
  }
 
  onSubmit(m: NgForm) {
    if (m.untouched || m.invalid) {
      alert('Required');
    } else {
      this.widget.title = m.value.title;
      this.widget.description = m.value.description;


    }
  }

  onAddedClick(event){
    this.widget.widgetType = this.selectedWidgetType;
    this.widget.dataSource = event[1];
    this.widget.metaDataSourceDataModels =event[0];
    console.log('created widget', this.widget);
    let dash = this.dashboardsService.getCurretDashboard();
    this.widgetService.addWidget(this.widget).subscribe(
      result => this.router.navigate(['/dashboards', dash.id])
    );
  }

}