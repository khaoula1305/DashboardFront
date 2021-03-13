
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
  updateClick(){
    // naviguer vers le updateComponent
  }

  ngOnInit(): void {

    let dataSource: DataSource =  this.widget.query.dataSource;
    //let mesures: any[][];
    this.dataSourceService.getData(dataSource).subscribe(data => {
      let nameOfDimension=this.widget.query.dimension;
      let nameOfmesure=this.widget.query.mesure1;
      let dimension;
      let mesure1;
      data.forEach(elm => dimension.push(elm.nameOfDimension));
    
     data.forEach(elm => mesure1.push(elm.nameOfmesure));
    
     this.basicData = {

      labels: dimension,
      datasets: [
 
          {
              label: 'mesure name',
              backgroundColor: '#FFA726',
              data: mesure1
          }
      ]
  };
    });
  //  console.log('dtat', labels);
    


  }

}
