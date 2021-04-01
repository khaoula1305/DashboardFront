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


@Component({
  selector: 'app-widget-configuration',
  templateUrl: './widget-configuration.component.html',
  styleUrls: ['./widget-configuration.component.scss']
})

export class WidgetConfigurationComponent implements OnInit {

  queries: DataSource[];
  selectedQuery: DataSource;
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
    //const dashboardId=this.dashboardsService.currentDasboard.id;
      this.dashboardWidgetService.getAllDashboardWidget('2b0588d4-9309-4ddd-9d7d-9054f123be2a').subscribe(
        (data) => {
          this.dashWidget= data.find( elm => elm.id == title);
          //this.selectedQuery=this.dashWidget.widget.dataSource;
           //this.myTable=this.dashWidget.widget.query.dataTable;
        //  this.type=this.dashWidget.widget.widgetType.type;
          this.SelectedQuery();
        },
        (error) => {
          console.log('error ' );
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
        console.log('getAllWidgetTypes error');
      },
      ()=>{
        // done
      }
    );
  }
  SelectedQuery(){
    this.dimension=[];
    this.mesure1=[];
    this.mesure2=[];
    /*this.myTable=this.selectedQuery.dataTable;
    this.selectedQuery.dataTable.forEach(elm => {
      this.dimension.push(elm.dimension);
    });
    this.selectedQuery.dataTable.forEach(elm => {
      this.mesure2.push(elm.mesure2);
    });
    this.selectedQuery.dataTable.forEach(elm => {
      this.mesure1.push(elm.mesure1);
    });*/
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
           // label: this.selectedQuery.mesure2 ,
            backgroundColor: '#FFA726',
            data: this.mesure2
        },
        {
         // label: this.selectedQuery.mesure1 ,
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
   // this.dashWidget.widget.dataSource = m.value.selectedQuery;
    //this.dashWidget.widget.widgetType= this.selectedWidgetType;
    this.dashboardWidgetService.updateDashboardWidget(this.dashWidget.dashboard.id, this.dashWidget);
  }
}
}
