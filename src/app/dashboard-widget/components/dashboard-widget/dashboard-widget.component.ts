import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { DashboardWidget } from 'src/app/dashboard-widget/models/dashboard-widget';
import { DashboardsService } from 'src/app/dashboard/services/dashboards.service';
import { MetaDataSource } from 'src/app/widget/models/meta-data-source.model';
import { QueryBuilderService } from '../../../data-source/services/query-builder.service';
import { GraphEnum, WidgetTypeEnum } from 'src/app/widget/models/widgetTypeEnum';
import { WidgetType } from 'src/app/widget/models/widget-type';
import { DataSourceService } from 'src/app/data-source/services/data-source.service';
import { Constants } from 'src/app/constants/constants';

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
  graphEnum = GraphEnum;
  widgetType: string;
  load= false;
  results=[];
  dimensionKey: MetaDataSource;
  datasets: any[] = [];
  result;
  widgetTypeOnUpdate:WidgetType;
  visibleSidebar=false;
  @Output() onDetail = new EventEmitter<any>();
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
     if(this.dashboardWidget.widget.dataSource.type== Constants.restAPI){
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
             this.createBasicData();
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
                if(this.dashboardWidget.widget.widgetType.type==this.graphEnum.Pie){
                  labels.push( { label: originKey.label , key: originKey.key,  backgroundColor: [], data:[]} );
                }
                else   labels.push( { label: originKey.label , key: originKey.key,   backgroundColor: this.generateColor(), data:[]} );
                }
               let dim= labels.pop();
              data.forEach(element=>{
               dimensions.push(element[dim.label.toUpperCase()]);
               labels.forEach( lab=>{
                 if(this.dashboardWidget.widget.widgetType.type==this.graphEnum.Pie) lab.backgroundColor.push(this.generateColor());
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

  createBasicData(){
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
  onShowDetails() {
    switch(this.dashboardWidget.widget.widgetType.type ){
      case this.widgetTypeEnum.Table:  {
        this.onDetail.emit([this.results, {}]);
        break;
      }
      case this.widgetTypeEnum.Card : {
      this.onDetail.emit([[], this.result ]);
      break;
      }
      default : this.onDetail.emit([this.results, this.basicData]);

    }
  }
  showDetails() {
    if(this.dashboardWidget.widget.dataSource.type == Constants.restAPI ){
      this.selectedCard.emit([this.results]);
    }else{
      if(this.dashboardWidget.widget.dataSourceDetails== null)
         this.dataSourceService.getDataFrom(this.dashboardWidget.widget.dataSource).subscribe(
           data=>  this.selectedCard.emit([data])
         );
      else this.dataSourceService.getDataFrom(this.dashboardWidget.widget.dataSourceDetails).subscribe(
           data=>  this.selectedCard.emit([data])
         );
    }
  }

  selectData(event) {
    let table=[];
    if(this.dashboardWidget.widget.dataSource.type == Constants.restAPI  || this.dashboardWidget.widget.dataSourceDetails== null){
     this.results.forEach(elm=>{
        if(elm[this.dashboardWidget.widget.metaDataSources.find(item=> item.isDimension==true).key]==event.element._model.label){
          table.push(elm);
        }
      });
    this.selectedCard.emit([table]);

    } else {
      this.dataSourceService.getDataSource(this.dashboardWidget.widget.dataSourceDetails.id).subscribe(
        data=>{
          this.queryBuilder.getDataForDetails(this.dashboardWidget.widget.id,event.element._model.label).subscribe( dat =>{
             this.selectedCard.emit([dat]);
          }
           );

        }
      )
    }
}

}
