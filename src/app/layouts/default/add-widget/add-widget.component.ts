import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WidgetType } from 'src/app/models/widget-type';
import { Widget } from 'src/app/models/widget.model';
import { WidgetTypeService } from 'src/app/services/widget-type.service';
import { WidgetsService } from 'src/app/services/widgets.service';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { DataSource } from 'src/app/models/data-source.model';
import { DataSourceService } from 'src/app/services/data-source.service';


@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.scss']
})
export class AddWidgetComponent implements OnInit {

  basicData;
  queries: DataSource[];
  selectedQuery: DataSource;
  widget: Widget= new Widget();
  title: string;
  description:string;
  widgetTypes: WidgetType[];
  selectedWidgetType: WidgetType;
  type: string;
  myTable;

  constructor(private dataSourceService: DataSourceService, 
    private widgetTypeService: WidgetTypeService,
    private widgetService: WidgetsService,
    private router: Router) { }

  ngOnInit(): void {
    this.type="bar";
  this.dataSourceService.getAllDataSources().subscribe(
    (data) => {
      this.queries = data;
      console.log(this.queries);
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
SelectedQuery(){
  this.draw();

}
SelectedWidgetType(){
this.type=this.selectedWidgetType.type;
if(this.selectedQuery){
  this.draw();
}
}
draw(){

}
onSubmit(m: NgForm) {
  if ( m.untouched || m.invalid) {
    alert('Required');
  } else {
    this.widget.title = m.value.title;
    this.widget.description= m.value.description;
    this.widget.dataSource = m.value.selectedQuery;
    this.widget.widgetType= m.value.selectedWidgetType;
    console.log('add widget ', this.widget);
    this.widgetService.addWidget(this.widget).subscribe(
      result => this.router.navigate(['/dashboards', 'Dash 2'])
       );
  }
}

}
