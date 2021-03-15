import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardWidget } from 'src/app/models/dashboard-widget';
import { Query } from 'src/app/models/query.model';
import { WidgetType } from 'src/app/models/widget-type';
import { DashboardWidgetService } from 'src/app/services/dashboard-widget.service';
import { QueryService } from 'src/app/services/query.service';
import { WidgetTypeService } from 'src/app/services/widget-type.service';


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

  addWidget: boolean= false;
  constructor(private route: ActivatedRoute, 
              private dashboardWidgetService: DashboardWidgetService , 
              private queryService: QueryService, 
              private widgetTypeService: WidgetTypeService) 
  {

   }

  ngOnInit(): void {
    const title = this.route.snapshot.params.title;

      this.dashboardWidgetService.getAllDashboardWidget().subscribe(
        (data) => {
          this.dashWidget= data.find( elm=> elm.title== title);
          this.selectedQuery=this.dashWidget.widget.query;
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
        //done
      }
    );
  }


}
