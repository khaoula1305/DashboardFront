import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WidgetType } from 'src/app/models/widget-type';
import { Widget } from 'src/app/models/widget.model';
import { WidgetTypeService } from 'src/app/services/widget-type.service';
import { WidgetsService } from 'src/app/services/widgets.service';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { DataSource } from 'src/app/models/data-source.model';
import { DataSourceService } from 'src/app/services/data-source.service';
import { WidgetTypeEnum } from '../../../models/widgetTypeEnum';
import { DashboardsService } from 'src/app/services/dashboards.service';
import { Dashboard } from 'src/app/models/dashboard.model';
@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.scss']
})
export class AddWidgetComponent implements OnInit {
  basicData;
  queries: DataSource[];
  selectedQuery: DataSource;
  widget: Widget = new Widget();
  title: string;
  description: string;
  widgetTypes: WidgetType[];
  selectedWidgetType: WidgetType;
  widgetType: string;
  widgetTypeEnum = WidgetTypeEnum;
 // ToBeImplemented
  dimension = [];
  mesure2 = [];
  mesure1 = [];
  results = [];

  constructor(
    private dataSourceService: DataSourceService,
    private dashboardsService: DashboardsService,
    private widgetTypeService: WidgetTypeService,
    private widgetService: WidgetsService,
    private router: Router) { }
  ngOnInit(): void {
    this.widgetType = 'bar';
    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        this.queries = data;
      }
    );
    this.widgetTypeService.getAllWidgetTypes().subscribe(
      (data) => {
        this.widgetTypes = data;

      },
      (error) => {
        console.log(error);
      }
    );
  }
  SelectedQuery() {
    this.dataSourceService.getDataFrom(this.selectedQuery).subscribe(
      (data) => {
        this.results=data;
        // ToBeImplemented
        // Ce traitement est static nous devons le remplacer        
        data.forEach(elm => {
          this.dimension.push(elm.date);
        });
        data.forEach(elm => {
          this.mesure2.push(elm.positive);
        });
        data.forEach(elm => {
          this.mesure1.push(elm.negative);
        });
      });
      this.draw();
  }
SelectedWidgetType(){
  this.widgetType = this.selectedWidgetType.type;
  if (this.selectedQuery) {
    this.draw();
  }
}
draw(){
  this.basicData = {
    labels: this.dimension,
    datasets: [
      {
        label: "Negative Cases",
        backgroundColor: '#FFA726',
        data: this.mesure2
      },
      {
        label: "Positive Cases",
        backgroundColor: '#AAA423',
        data: this.mesure1
      }
    ]
  };
}
onSubmit(m: NgForm) {
  if (m.untouched || m.invalid) {
    alert('Required');
  } else {
    this.widget.title = m.value.title;
    this.widget.description = m.value.description;
    this.widget.dataSource = m.value.selectedQuery;
    this.widget.widgetType = this.selectedWidgetType;
    this.widget.defaultItemCols=2;
    this.widget.defaultItemRows=2;
    this.widget.minItemCols=1;
    this.widget.minItemRows=1;
    let dash= this.dashboardsService.getCurretDashboard();
    this.widgetService.addWidget(this.widget).subscribe(
      result =>      this.router.navigate(['/dashboards',dash.id])
    );
  }
}

}
