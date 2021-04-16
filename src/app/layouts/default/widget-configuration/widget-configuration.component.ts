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
import { Dashboard } from '../../../models/dashboard.model';
import { WidgetTypeEnum } from 'src/app/models/widgetTypeEnum';
import { MetaDataSource } from 'src/app/models/meta-data-source.model';
@Component({
  selector: 'app-widget-configuration',
  templateUrl: './widget-configuration.component.html',
  styleUrls: ['./widget-configuration.component.scss']
})
export class WidgetConfigurationComponent implements OnInit {
  queries: DataSource[];
  results;
  selectedQuery: DataSource;
  currentDashboard: Dashboard;
  dashboardWidget: DashboardWidget;
  load: boolean=false;
  widgetTypeEnum = WidgetTypeEnum;
  dimensionKey: MetaDataSource;
  datasets: any[] = [];
  selectedKeys : MetaDataSource[];
  basicData: any;
  basicOptions: any;
  result;
  widgetTypes: WidgetType[];
  selectedWidgetType: WidgetType;
  addWidget: boolean= false;
  constructor(private route: ActivatedRoute, 
              private dashboardWidgetService: DashboardWidgetService , 
              private dashboardsService: DashboardsService , 
              private dataSourceService: DataSourceService, 
              private widgetTypeService: WidgetTypeService,
              private router: Router) 
              {}

  ngOnInit(): void {
    const id = this.route.snapshot.params.title;
    this.currentDashboard =this.dashboardsService.getCurretDashboard();
      this.dashboardWidgetService.getAllDashboardWidget(this.currentDashboard.id).subscribe(
        (data) => {
          this.dashboardWidget= data.find(e=> e.id==id);
          var myLabels=[];
          var objet: any;
          this.selectedWidgetType = this.dashboardWidget.widget.widgetType;
           this.selectedKeys= this.dashboardWidget.widget.metaDataSourceDataModels;
          this.dataSourceService.getDataFrom(this.dashboardWidget.widget.dataSource).subscribe(
              (data) => {
                this.results=data;
                switch(this.selectedWidgetType.type) {
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
                           label: this.dimensionKey.label,
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
        }
    );
    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        this.queries = data;
      }
    );
     
    this.widgetTypeService.getAllWidgetTypes().subscribe(
      (data)=>{
        this.widgetTypes=data;
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  generateColor() {
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
  }
  SelectedWidgetType(){
    this.basicData.datasets[0].backgroundColor=this.generateColor();
    console.log(this.basicData.datasets[0].backgroundColor);

  }
  
onSubmit(m: NgForm) {
  if ( m.untouched || m.invalid) {
    alert('Required');
  } else {
    this.dashboardWidget.title = m.value.title;
    this.dashboardWidget.description= m.value.description;
    //this.dashboardWidget.widget.dataSource= m.value.selectedQuery;
    this.dashboardWidget.widget.widgetType=m.value.selectedWidgetType;
    this.dashboardWidgetService.updateDashboardWidget(this.dashboardWidget.dashboard.id, this.dashboardWidget).subscribe(
      data =>   this.router.navigate(['/dashboards',this.currentDashboard.id])
    );
  }
}
}
