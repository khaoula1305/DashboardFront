
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSourceService } from 'src/app/services/data-source.service';
import {DataSource} from 'src/app/models/data-source.model';

@Component({
  selector: 'app-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss']
})
export class DashboardWidgetComponent implements OnInit {

  @Output() deleted = new EventEmitter<any>();
  @Input() widget;
  basicData: any;
    
  basicOptions: any;
  constructor(private dataSourceService:DataSourceService) { }

  deleteClick(){
    this.deleted.emit(true);
    console.log("widget ", this.widget);
  }

  ngOnInit(): void {
    //we have here a widget ==> widget.dataSource
    let dataSource: DataSource =   {id: 1, title: "source 1", url: "https://api.covidtracking.com/v1/us/daily.json"};
    let mesures: any[][];
    this.dataSourceService.getData(dataSource).subscribe(data => {
     //console.log(' data',data);
    // console.log(' data 0',data[0]);

    let nameOfDimension=this.widget.query.dimension;
    
    let nameOfmesures=this.widget.query.mesures;

    let dimension: any[]=[];
     data.forEach(elm => dimension.push(elm.nameOfDimension));
    
     data.forEach(elm => mesures[nameOfmesures].push(elm.nameOfmesures[0]));
    
     this.basicData = {

      labels: dimension,
      datasets: [
 
          {
              label: 'mesure name',
              backgroundColor: '#FFA726',
              data: mesures
          }
      ]
  };
    });
  //  console.log('dtat', labels);
    


  }

}
