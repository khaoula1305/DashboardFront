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
  selectedKeys: MetaDataSource[];
  basicData: any;
  basicOptions: any;
  items: MenuItem[];
  widgetId: any;
  widgetTypeEnum = WidgetTypeEnum;
  graphEnum = GraphEnum;
  widgetType: string;
  load = false;
  results = [];
  dimensionKey: MetaDataSource;
  result;
  widgetTypeOnUpdate: WidgetType;
  visibleSidebar = false;
  staticWidget = true;
  // Chart
  labels = [];
  dimensions = [];
  datasets: any[] = [];
  @Output() fullScreen = new EventEmitter<any>();
  @Output() selectedItemDetail = new EventEmitter<any>();

  constructor(
    private dataSourceService: DataSourceService,
    private dashboardsService: DashboardsService,
    private router: Router,
    private queryBuilder: QueryBuilderService
  ) {}
  ngOnInit(): void {
     this.widgetType = this.dashboardWidget.widget.widgetType.type;
     // static widget, w don't need datasource
     if (this.widgetType === this.widgetTypeEnum.Currency){
      this.load = true;
      this.staticWidget = false;
    }else{
      this.selectedKeys = this.dashboardWidget.widget.metaDataSources;
      // there is tow cases: Rest API and QueryBuilder
      if (this.dashboardWidget.widget.dataSource.type === Constants.restAPI){
       this.dataSourceService.getDataFrom(this.dashboardWidget.widget.dataSource).subscribe(
         (data) => {
           this.results = data;
           switch (this.widgetType) {
             case this.widgetTypeEnum.Table : {
               break;
              }
             case this.widgetTypeEnum.Card : {
               let somme = 0;
               this.results.forEach(elm => {
                 somme += elm[this.selectedKeys[0].key];
               });
               this.result = {
                 key: somme,
                 label: this.selectedKeys[0].label
               };
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
         () => {
           this.load = true;
         });
      }else{
       this.queryBuilder.getData(this.dashboardWidget.widget.id).subscribe(
         (data) => {
           this.results = data;
           switch (this.widgetType) {
             case this.widgetTypeEnum.Table : {
               break;
              }
             case this.widgetTypeEnum.Card : {
               this.result = {
                 key: data[0].COUNT,
                 label: this.selectedKeys[0].label
               };
               break;
             }
             default : {
               for (const key in data[0]) {
                 if (Object.prototype.hasOwnProperty.call(data[0], key)) {
                  const originKey =  this.dashboardWidget.widget.metaDataSources
                  .find( meta => meta.label.toLowerCase() === key.toLowerCase());
                  if (this.dashboardWidget.widget.widgetType.type === this.graphEnum.Pie){
                    this.labels.push( { label: originKey.label , key: originKey.key,  backgroundColor: [], data: []} );
                  }
                  else {
                    this.labels.push(
                      {
                        label: originKey.label ,
                        key: originKey.key,
                        backgroundColor: this.generateColor(), data: []}
                      );
                   }
                 }
               }
               const dim = this.labels.pop();
               data.forEach(element => {
                this.dimensions.push(element[dim.label.toUpperCase()]);
                this.labels.forEach( lab => {
                  if (this.dashboardWidget.widget.widgetType.type === this.graphEnum.Pie)
                   { lab.backgroundColor.push(this.generateColor()); }
                  lab.data.push(element[lab.label.toUpperCase()]);
                });
               });
               this.basicData = { labels: this.dimensions, datasets: this.labels };
               break;
             }
           }
         },
         (error) => {
           console.log(error);
         },
         () => {
           this.load = true;
         });
      }
    }
  }
  // Generate the data that we will be used in the chart
  createBasicData(): void {
    const labels = [];
    const dimensions = [];
    const dimension = this.dashboardWidget.widget.metaDataSources.find( e => e.isDimension === true);
    this.dashboardWidget.widget.metaDataSources.forEach(element => {
      if (!element.isDimension){
        if (this.dashboardWidget.widget.widgetType.type === this.graphEnum.Pie){
        labels.push( { label: element.label, key: element.key,  backgroundColor: [], data: []} );
      }
      else { labels.push( { label: element.label, key: element.key, backgroundColor: this.generateColor(), data: []} ); }
         }
    });
    this.results.forEach((elm) => {
      let repeat = true;
      for (let index = 0; index < dimensions.length; index++) {
       if (dimensions[index] === elm[dimension.key]){
        repeat = false;
        labels.forEach(lab => {
          lab.data[index] += elm[lab.key];
        });
        break;
       }
      }
      if (repeat) {
        dimensions.push(elm[dimension.key]);
        labels.forEach( lab => {
        if (this.dashboardWidget.widget.widgetType.type === this.graphEnum.Pie) { lab.backgroundColor.push(this.generateColor()); }
        lab.data.push(elm[lab.key]);
        });
      }
    });
    this.basicData = { labels: dimensions, datasets: labels };
  }
  generateColor(): string {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
  }
  updateWidgetDashboard(id: any): void {
    this.dashboardsService.currentDasboard = this.dashboardWidget.dashboard;
    this.router.navigate(['/updateWidget', id]);
  }
  // Emit delete event
  deleteClick(): void {
    this.deleted.emit(true);
  }
  // this for full screen
  onShowDetails(): void {
    switch (this.dashboardWidget.widget.widgetType.type ){
      case this.widgetTypeEnum.Table:  {
        this.fullScreen.emit([this.results, {}]);
        break;
      }
      case this.widgetTypeEnum.Card : {
      this.fullScreen.emit([[], {} ]);
      break;
      }
      case this.widgetTypeEnum.Currency: {
        this.fullScreen.emit([[], {} ]);
        break;
      }
      default : this.fullScreen.emit([this.results, this.basicData]);

    }
  }
  // whene user click for details
  onClickForDetail(event): void {
    switch (this.dashboardWidget.widget.widgetType.type){
      case  this.widgetTypeEnum.Card: {
        if (this.dashboardWidget.widget.dataSource.type === Constants.restAPI ){
          this.selectedItemDetail.emit(this.results);
        }else{
          if (this.dashboardWidget.widget.dataSourceDetails === null) {
             this.dataSourceService.getDataFrom(this.dashboardWidget.widget.dataSource).subscribe(
               data =>  this.selectedItemDetail.emit(data)
             );
          }
          else { this.dataSourceService.getDataFrom(this.dashboardWidget.widget.dataSourceDetails).subscribe(
               data =>  this.selectedItemDetail.emit(data)
             );
          }
        }
        break;
      }
      case this.widgetTypeEnum.Currency: {
        this.selectedItemDetail.emit(event);
        break;
      }
        }
  }
  // When the user clicks in the graph for more details
  selectData(event): void {
    const label = this.basicData.labels[event.element._index];
    const table = [];
    if (this.dashboardWidget.widget.dataSource.type === Constants.restAPI  || this.dashboardWidget.widget.dataSourceDetails === null){
     this.results.forEach(elm => {
        if (elm[this.dashboardWidget.widget.metaDataSources.find(item => item.isDimension === true).key] === label){
          table.push(elm);
        }
      });
     this.selectedItemDetail.emit(table);
    } else {
      this.dataSourceService.getDataSource(this.dashboardWidget.widget.dataSourceDetails.id).subscribe(
        data => {
          this.queryBuilder.getDataForDetails(this.dashboardWidget.widget.id, label).subscribe( dat => {
             this.selectedItemDetail.emit(dat);
          }
           );

        }
      );
    }
}

}
