import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DataSourceService } from 'src/app/services/data-source.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { WidgetTypeEnum } from 'src/app/models/widgetTypeEnum';
import { DashboardWidget } from 'src/app/models/dashboard-widget';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { MetaDataSource } from 'src/app/models/meta-data-source.model';
import { WidgetType } from 'src/app/models/widget-type';
import { Widget } from 'src/app/models/widget.model';
import { Dashboard } from 'src/app/models/dashboard.model';
import { QueryBuilder } from '../../../models/QueryBuilder.model';
import { QueryBuilderService } from '../../../services/query-builder.service';

@Component({
  selector: 'app-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardWidgetComponent implements OnInit {
  @Output() deleted = new EventEmitter<any>();
  @Input() dashboardWidget: DashboardWidget;
  selectedKeys : MetaDataSource[];
  basicData: any;
  basicOptions: any;
  items: MenuItem[];
  widgetId: any;
  widgetTypeEnum = WidgetTypeEnum;
  widgetType: string;
  load= false;
  results=[];
  dimensionKey: MetaDataSource;
  datasets: any[] = [];
  result;
  widgetTypeOnUpdate:WidgetType;
  visibleSidebar=false;
  @Output() selectedDashboardWidget = new EventEmitter<any>();
  @Output() selectedCard = new EventEmitter<any>();

  constructor(
    private dataSourceService: DataSourceService,
    private dashboardsService: DashboardsService,
    private router: Router,
    private queryBuilder: QueryBuilderService
  ) {}
  ngOnInit(): void {
     this.widgetType = this.dashboardWidget.widget.widgetType.type;
     this.selectedKeys= this.dashboardWidget.widget.metaDataSources;
     if(this.dashboardWidget.widget.dataSource.type== "Rest API"){
      this.dataSourceService.getDataFrom(this.dashboardWidget.widget.dataSource).subscribe(
        (data) => {
          this.results=data;
          switch(this.widgetType) {
            case this.widgetTypeEnum.Table : {
              break;
             }
            case this.widgetTypeEnum.Card : {
              let somme=0;
              this.results.forEach(elm => {
                somme+=elm[this.selectedKeys[0].key];
              })
              this.result = {
                key: somme,
                label:this.selectedKeys[0].label
              }
              break;
            }
            default : {
             this.CreateBasicData();
              break;
            }
          }
        },
        (error) => {
          console.log(error);
        },
        ()=>{
          this.load=true;
        });
     }else{
      this.queryBuilder.getData(this.dashboardWidget.widget.id).subscribe(
        (data) => {
          this.results=data;
          switch(this.widgetType) {
            case this.widgetTypeEnum.Table : {
              break;
             }
            case this.widgetTypeEnum.Card : {
              this.result = {
                key: data[0]["COUNT"],
                label:this.selectedKeys[0].label
              }
              break;
            }
            default : {
              var labels=[];
              var dimensions=[];
              for(let key in data[0]){
                let originKey=  this.dashboardWidget.widget.metaDataSources.find( meta => meta.label.toLowerCase() == key.toLowerCase());
                if(this.dashboardWidget.widget.widgetType.type=="pie"){
                  labels.push( { label: originKey.label , key: originKey.key,  backgroundColor: [], data:[]} );
                }
                else   labels.push( { label: originKey.label , key: originKey.key,   backgroundColor: this.generateColor(), data:[]} );
                }
               let dim= labels.pop();
              data.forEach(element=>{
               dimensions.push(element[dim.label.toUpperCase()]);
               labels.forEach( lab=>{
                 if(this.dashboardWidget.widget.widgetType.type=="pie") lab.backgroundColor.push(this.generateColor());
                 lab.data.push(element[lab.label.toUpperCase()]);
               });
              });
              this.basicData = { labels: dimensions, datasets: labels };
              break;
            }
          }
        },
        (error) => {
          console.log(error);
        },
        ()=>{
          this.load=true;
        });
     }
  }

  CreateBasicData(){
    var labels=[];
    var dimensions=[];
    var dimension= this.dashboardWidget.widget.metaDataSources.find( e=> e.isDimension==true);
    this.dashboardWidget.widget.metaDataSources.forEach(element=>{
      if(!element.isDimension){ 
 labels.push( { label: element.label, key:element.key, backgroundColor: this.generateColor(), data:[]} );
      }
    })
    this.results.forEach((elm) => {
      let repeat=true;
      for (let index = 0; index < dimensions.length; index++) {
       if(dimensions[index]== elm[dimension.key]){
        repeat=false;
        labels.forEach(lab=>{
          lab.data[index]+=elm[lab.key];
        })
         break;
       }
      }
      if(repeat) {
        dimensions.push(elm[dimension.key]);
        labels.forEach( lab=>{
          lab.data.push(elm[lab.key]);
        })
      }
    });
    this.basicData = { labels: dimensions, datasets: labels };
  }
  generateColor() {
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
  }
  updateWidgetDashboard(id: any){
    this.dashboardsService.currentDasboard= this.dashboardWidget.dashboard;
    this.router.navigate(['/updateWidget', id]);
  }
  deleteClick() {
    this.deleted.emit(true);
  }
  onShowDetails(dashbaordWidget: DashboardWidget) {
    this.selectedDashboardWidget.emit(dashbaordWidget);
  }
  showDetails() {
    this.selectedCard.emit([this.results]);
  }

  selectData(event) {
    let table=[];
    if(this.dashboardWidget.widget.dataSource.type== "Rest API"){
     this.results.forEach(elm=>{
        if(elm[this.dashboardWidget.widget.metaDataSources.find(item=> item.isDimension==true).key]==event.element._model.label){
          table.push(elm);
        }
      });
    } else {
      var sqlText=""
      this.queryBuilder.getDataForDetails(sqlText).subscribe( data => table = data); 
    }
    this.selectedCard.emit([table]);
}

}
