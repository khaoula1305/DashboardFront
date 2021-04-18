import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { DataSourceService } from 'src/app/services/data-source.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetTypeEnum } from 'src/app/models/widgetTypeEnum';
import { DataSource } from 'src/app/models/data-source.model';
import { DashboardWidget } from 'src/app/models/dashboard-widget';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { MetaDataSource } from 'src/app/models/meta-data-source.model';
import { error } from '@angular/compiler/src/util';
import { WidgetType } from 'src/app/models/widget-type';

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
  dimension=[];
  mesure2=[];
  mesure1=[];
  results=[];
  dimensionKey: MetaDataSource;
  datasets: any[] = [];
  result;
  widgetTypeOnUpdate:WidgetType;

  constructor(
    private dataSourceService: DataSourceService,
    private dashboardsService: DashboardsService,
    private router: Router
  ) {}

  deleteClick() {
    this.deleted.emit(true);
  }
  ngOnInit(): void {
    var myLabels=[];
    var objet: any;
    if(this.dashboardWidget.widget){
      console.log(this.dashboardWidget.widget);
     this.widgetType = this.dashboardWidget.widget.widgetType.type;
     this.selectedKeys= this.dashboardWidget.widget.metaDataSourceDataModels;
    }
      this.dataSourceService.getDataFrom(this.dashboardWidget.widget.dataSource).subscribe(
        (data) => {
          this.results=data;
          switch(this.widgetType) {
            case this.widgetTypeEnum.Table : {
              break;

            }
            case this.widgetTypeEnum.Card : {
              this.results.forEach(elm => {
                this.result = {
                  key: elm[this.selectedKeys[0].key],
                  label:this.selectedKeys[0].label
                }
              })
              break;

            }
            default : {
              this.dimensionKey = this.dashboardWidget.widget.metaDataSourceDataModels.find(elm => elm.isDimension==true);
              if(this.dimensionKey){
               this.results.forEach(elm => myLabels.push(elm[this.dimensionKey.key]));
               this.dashboardWidget.widget.metaDataSourceDataModels.forEach(element=> {
                 if(!element.isDimension){
                   var label = [];
                   this.results.forEach(elm => label.push(elm[element.key]));
                   objet = {
                     label: element.label,
                     backgroundColor: this.generateColor(),
                     data: label
                   };
                   this.datasets.push(objet);
                 }
               })
              } 
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
        this.basicData = { labels: myLabels, datasets: this.datasets };   
        this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          this.dashboardsService.currentDasboard= this.dashboardWidget.dashboard;
          this.router.navigate(['/updateWidget', this.widgetId]);
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          this.deleteClick();
        },
      },
      { label: 'Show', icon: 'pi pi-info', url: '#' },
      { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/'] },
    ];
   
  }

  save(severity: any) {
    this.dashboardsService.currentDasboard= this.dashboardWidget.dashboard;
    this.router.navigate(['/updateWidget', severity]);
  }
  dropdown(info: any) {
    this.widgetId = info;
  }
  updateWidgetDashboard(id: any){
    this.dashboardsService.currentDasboard= this.dashboardWidget.dashboard;
    this.router.navigate(['/updateWidget', id]);
  }

  generateColor() {
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
  }

}
