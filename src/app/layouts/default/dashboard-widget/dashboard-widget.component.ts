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
    private router: Router
  ) {}
  ngOnInit(): void {
     this.widgetType = this.dashboardWidget.widget.widgetType.type;
     this.selectedKeys= this.dashboardWidget.widget.metaDataSources;
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
  }

CreateBasicData(){
  var myLabels=[];
  var objet: any;
  console.log(this.result);
   this.dashboardWidget.widget.metaDataSources.forEach(element=> {
     if(element.isDimension){
      this.results.forEach((elm) => {
        let repeat=true;
        for (let index = 0; index < myLabels.length; index++) {
         if(myLabels[index]== elm[element.key]){
          repeat=false;
           break;
         }
          
        }
        if(repeat) myLabels.push(elm[element.key]);
      });
     }
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
  this.basicData = { labels: myLabels, datasets: this.datasets };
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
    this.selectedCard.emit([this.results,this.selectedKeys]);
  }

}
