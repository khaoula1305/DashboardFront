import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Query } from 'src/app/models/query.model';
import { WidgetType } from 'src/app/models/widget-type';
import { Widget } from 'src/app/models/widget.model';
import { QueryService } from 'src/app/services/query.service';
import { WidgetTypeService } from 'src/app/services/widget-type.service';
import { WidgetsService } from 'src/app/services/widgets.service';
import {FormControl, NgForm, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.scss']
})
export class AddWidgetComponent implements OnInit {

  basicData;
  queries: Query[];
  selectedQuery: Query;
  widget: Widget= new Widget();
  title: string;
  description:string;
  widgetTypes: WidgetType[];
  constructor(private queryService: QueryService, 
    private widgetTypeService: WidgetTypeService,
    private widgetService: WidgetsService,
    private router: Router) { }

  ngOnInit(): void {


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
    this.widget.title = m.value.title;
    this.widget.description= m.value.description;
    this.widget.query = m.value.selectedQuery;
    this.widget.type= this.widgetTypes[1];
    console.log('add widget ', this.widget);
    this.widgetService.addWidget(this.widget).subscribe(
      result => this.router.navigate(['/dashboards', 'Dash 2'])
       );
  }
}

}
