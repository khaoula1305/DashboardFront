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
  widgetType: string;
  widgetTypeEnum = WidgetTypeEnum;
  labels: any[]=[];
  datasets: any[] = [];
  results = [];
  showQueries = false;
  showKeys = false;
  allKeys: MetaDataSource[]=[];
 // selectedKeys: MetaDataSource[]=[];
  preview=false;
  labelsWrited=false;
  drawType=false;
  dimensionKey: MetaDataSource;
  isGraph= false;
  isTable = false;
  isDimension;
  oldValue:string;
  disableQueriesDropdown=false;

  constructor(
    private dataSourceService: DataSourceService,
    private dashboardsService: DashboardsService,
    private widgetTypeService: WidgetTypeService,
    private widgetService: WidgetsService,
    private router: Router) { }


  ngOnInit(): void {
    this.widgetService.currentWidget.subscribe(
      (widget) => {
        widget.metaDataSourceDataModels = [];

        this.widget = widget;
      }
    );
    
    this.widgetTypeService.getAllWidgetTypes().subscribe(
      (data) => {
        this.widgetTypes = data;
      },
      (error) => {
        console.log(error);
      }
    );

    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        this.queries = data;
        /*data.forEach(elm => {
          this.dataSourceService.getDataFrom(elm).subscribe(
            (dataBody) => {
              if(dataBody.length>=2 && Object.keys(dataBody[0]).length>=2){
                this.queries.push(elm);
              }
            }
          );
        })*/
      },
      (error) => {
        console.log(error);
      }
    );
  }
 

  onSelectedQuery() {
    //un filtrage à faire
    /*this.showKeys = true;
    this.dataSourceService.getDataFrom(this.selectedQuery).subscribe(
      (data) => {
        this.results = data;
        for (let key in data[0]) {
          this.allKeys.push({ id: UUID.UUID(), key, label: key, isDimension: false });
        }
      });*/
      if(this.widget.dataSource!=null) this.disableQueriesDropdown=true;
  }
  onSelectedType(){
   

   // this.widgetService.setCurrentWidget(this.widget);

  }
 
  onSubmit(m: NgForm) {
    if (m.untouched || m.invalid) {
      alert('Required');
    } else {
      this.widget.title = m.value.title;
      this.widget.description = m.value.description;
      this.widget.dataSource = m.value.selectedQuery;
      this.widget.defaultItemCols=2;
      this.widget.defaultItemRows=2;
      this.widget.minItemCols=1;
      this.widget.minItemRows=1;
      //this.widget.metaDataSourceDataModels = this.selectedKeys;
      let dash = this.dashboardsService.getCurretDashboard();
      this.widgetService.addWidget(this.widget).subscribe(
        result => this.router.navigate(['/dashboards', dash.id])
      );
    }
  }

  onAddedClick(event){
    this.widget.defaultItemCols=2;
    this.widget.defaultItemRows=2;
    this.widget.minItemCols=1;
    this.widget.minItemRows=1;
    this.widget.metaDataSourceDataModels =event.metaDataSourceDataModels;
    console.log('created widget', this.widget);
    let dash = this.dashboardsService.getCurretDashboard();
    this.widgetService.addWidget(this.widget).subscribe(
      result => this.router.navigate(['/dashboards', dash.id])
    );
  }

}