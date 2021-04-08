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
@Component({
  selector: 'app-widget-configuration',
  templateUrl: './widget-configuration.component.html',
  styleUrls: ['./widget-configuration.component.scss']
})
export class WidgetConfigurationComponent implements OnInit {
  queries: DataSource[];
  selectedQuery: DataSource;
  currentDashboard: Dashboard;
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
    this.currentDashboard =this.dashboardsService.getCurretDashboard();
      this.dashboardWidgetService.getAllDashboardWidget(this.currentDashboard.id).subscribe(
        (data) => {
          this.dashWidget= data.find( elm => elm.id == title);
          this.selectedQuery=this.dashWidget.widget.dataSource;
          this.type=this.dashWidget.widget.widgetType.type;
          this.SelectedQuery();
        },
        (error) => {
          console.log(error);
          },
          () => {
         this.load=true;
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
  SelectedQuery(){
    //ToBeImplemented
    this.dimension=[];
    this.mesure1=[];
    this.mesure2=[];
    this.dataSourceService.getDataFrom(this.selectedQuery).subscribe(
      (Restdata) => {
        this.results=Restdata;
        if( this.dashWidget.widget.widgetType.type!= 'card'){
        Restdata.forEach(elm => {
          this.dimension.push(elm.date);
        });
        Restdata.forEach(elm => {
          this.mesure2.push(elm.positive);
        });
        Restdata.forEach(elm => {
          this.mesure1.push(elm.negative);
        });
      }
      });
    this.draw();
}
SelectedWidgetType(){
  this.type=this.selectedWidgetType.type;
  this.draw();
}
draw(){
  this.basicData = {
    labels: this.dimension,
    datasets: [
        {
            label: "positive cases",
            backgroundColor: '#FFA726',
            data: this.mesure2
        },
        {
          label: "negative cases",
          backgroundColor: '#AAA423',
          data:  this.mesure1
      }
    ]
};
}
onSubmit(m: NgForm) {
  if ( m.untouched || m.invalid) {
    alert('Required');
  } else {
    this.dashWidget.title = m.value.title;
    this.dashWidget.description= m.value.description;
    this.dashWidget.widget.dataSource= m.value.selectedQuery;
    this.dashWidget.widget.widgetType=m.value.selectedWidgetType;
    this.dashboardWidgetService.updateDashboardWidget(this.dashWidget.dashboard.id, this.dashWidget).subscribe(
      data =>   this.router.navigate(['/dashboards',this.currentDashboard.id])
    );
  }
}
}
