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

  constructor(
    private dataSourceService: DataSourceService,
    private dashboardsService: DashboardsService,
    private widgetTypeService: WidgetTypeService,
    private widgetService: WidgetsService,
    private router: Router) { }


  ngOnInit(): void {
    this.widgetType = 'bar';
    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        this.queries = data;
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
  }
  onSelectedDimension() {
  this.dimensionKey.isDimension=true;
  this.results.forEach(elm=> this.labels.push(elm[this.dimensionKey.key])) ;
  var removeIndex = this.allKeys.map(function (item) { return item.id; }).indexOf(this.dimensionKey.id);
  this.allKeys.splice(removeIndex, 1); 
  this.selectedKeys.push(this.dimensionKey); 
  }
  onSelectedMesure(data: MetaDataSource) {
    var objet: any;
    var label=[];
    this.results.forEach(elm=> label.push(elm[data.key])) ;
    objet = {
      label: data.label,
      backgroundColor: this.generateColor(),
      data: label
    };
    this.datasets.push(objet);
  }
  onSelectedKey(key: string, id: string){

    this.selectedKeys.push({ id, key, label: key, isDimension:false});
    if(this.selectedKeys.length== 0) this.preview=true;
    else  this.preview=false;
    this.removeSelectedKeyFromFirstList(id);
    this.labelsWrited=true;
    this.onSelectedMesure({ id, key, label: key, isDimension:false});
   
  }
  onRemovedKey(key: string, id: string) {

    this.allKeys.push({id, key, label: key, isDimension:false});
    this.removeSelectedKeyFromSecondList(id);
  }
  removeSelectedKeyFromFirstList(id: string) {

    var removeIndex = this.allKeys.map(function (item) { return item.id; }).indexOf(id);
    this.allKeys.splice(removeIndex, 1);
  }
  removeSelectedKeyFromSecondList(id: string) {
    var removeIndex = this.selectedKeys.map(function (item) { return item.id; }).indexOf(id);
    this.selectedKeys.splice(removeIndex, 1);
    if(this.selectedKeys.length== 0) this.preview=true;
    else  this.preview=false;
  }
  generateColor() {
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);

  }
  onSelectedQuery() {
    this.showKeys = true;
    this.dataSourceService.getDataFrom(this.selectedQuery).subscribe(
      (data) => {
        this.results = data;
        for(let key in data[0]){
          this.allKeys.push({id: UUID.UUID(),key, label:'label 1', isDimension:false});
        }
        console.log("all keys",this.allKeys);

      });
      if(this.selectedWidgetType.type == 'bar' || this.selectedWidgetType.type == 'pie' || this.selectedWidgetType.type == 'line') {
        this.isGraph = true;
      } else this.isTable = true;
  }
  OnSelectedWidgetType() {
    this.showQueries = true;
    this.widgetType = this.selectedWidgetType.type;
  }
  draw() {

    this.drawType = true;
    this.basicData = { labels: this.labels, datasets: this.datasets };

  }
  onSubmit(m: NgForm) {
    if (m.untouched || m.invalid) {
      alert('Required');
    } else {
      this.widget.title = m.value.title;
      this.widget.description = m.value.description;
      this.widget.dataSource = m.value.selectedQuery;
      this.widget.widgetType = this.selectedWidgetType;
      this.widget.metaDataSourceDataModels = this.selectedKeys;
      let dash = this.dashboardsService.getCurretDashboard();
      this.widgetService.addWidget(this.widget).subscribe(
        result => this.router.navigate(['/dashboards', dash.id])
      );
    }
  }

}