import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardWidget } from 'src/app/models/dashboard-widget';
import { Query } from 'src/app/models/query.model';
import { WidgetType } from 'src/app/models/widget-type';
import { DashboardWidgetService } from 'src/app/services/dashboard-widget.service';
import { QueryService } from 'src/app/services/query.service';
import { WidgetTypeService } from 'src/app/services/widget-type.service';
import {FormControl, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'app-widget-configuration',
  templateUrl: './widget-configuration.component.html',
  styleUrls: ['./widget-configuration.component.scss']
})

export class WidgetConfigurationComponent implements OnInit {

  queries: Query[];
  selectedQuery: Query;
  dashWidget: DashboardWidget;
  load: boolean=false;
  widgetTypes: WidgetType[];
  basicData;
  type;

  addWidget: boolean= false;
  constructor(private route: ActivatedRoute, 
              private dashboardWidgetService: DashboardWidgetService , 
              private queryService: QueryService, 
              private widgetTypeService: WidgetTypeService,
              private router: Router) 
              {}

  ngOnInit(): void {
    const title = this.route.snapshot.params.title;
      this.dashboardWidgetService.getAllDashboardWidget().subscribe(
        (data) => {
          this.dashWidget= data.find( elm=> elm.title== title);
          this.selectedQuery=this.dashWidget.widget.query;
          this.type=this.dashWidget.widget.type.type;
          this.SelectedQuery();
        },
        (error) => {
          console.log('error ' );
          },
          () => {
         this.load=true;
          }
    );
    this.queryService.getAllQueries().subscribe(
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
    const dimension = [];
    this.selectedQuery.dataTable.forEach(elm => {
      dimension.push(elm.dimension);
    });
    const mesure2 = [];
    this.selectedQuery.dataTable.forEach(elm => {
      mesure2.push(elm.mesure2);
    });
    const mesure1 = [];
    this.selectedQuery.dataTable.forEach(elm => {
      mesure1.push(elm.mesure1);
    });
    this.basicData = {
    labels: dimension,
    datasets: [

        {
            label: this.selectedQuery.mesure2 ,
            backgroundColor: '#FFA726',
            data: mesure2
        },
        {
          label: this.selectedQuery.mesure1 ,
          backgroundColor: '#AAA423',
          data:  mesure1
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
    this.dashWidget.widget.query = m.value.selectedQuery;
    this.dashboardWidgetService.updateDashboardWidget(this.dashWidget).subscribe(
      result => this.router.navigate(['/dashboards', 'Dash 2'])
       );
  }
}
}
