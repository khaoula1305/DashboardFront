import { Component, OnInit } from '@angular/core';
import { Query } from 'src/app/models/query.model';
import { WidgetType } from 'src/app/models/widget-type';
import { Widget } from 'src/app/models/widget.model';
import { QueryService } from 'src/app/services/query.service';
import { WidgetTypeService } from 'src/app/services/widget-type.service';

@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.scss']
})
export class AddWidgetComponent implements OnInit {


  queries: Query[];
  selectedQuery: Query;
  widget: Widget;
  title: string;
  description:string;
  widgetTypes: WidgetType[];
  constructor(private queryService: QueryService, 
    private widgetTypeService: WidgetTypeService) { }

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

}
