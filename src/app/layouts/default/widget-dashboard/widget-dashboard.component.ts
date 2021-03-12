
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSourceService } from 'src/app/services/data-source.service';
import {DataSource} from 'src/app/models/dataSource.model';

@Component({
  selector: 'app-widget-dashboard',
  templateUrl: './widget-dashboard.component.html',
  styleUrls: ['./widget-dashboard.component.scss']
})
export class WidgetDashboardComponent implements OnInit {

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
    let mesures;
    this.dataSourceService.getData(dataSource).subscribe(data => {
     console.log(' data',data);
     console.log(' data 0',data[0]);

     mesures=data;
     this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: '#42A5F5',
              //data: [65, 59, 80, 81, 56, 55, 40]
              data: mesures[0].positive
          },
          {
              label: 'My Second dataset',
              backgroundColor: '#FFA726',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  };
    });
  //  console.log('dtat', labels);
    


  }

}
