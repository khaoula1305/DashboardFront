
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
  @Input() dashboardWidget;
  basicData: any;
    
  basicOptions: any;
  constructor(private dataSourceService:DataSourceService) { }

  deleteClick(){
    this.deleted.emit(true);
    console.log("widget ", this.dashboardWidget);
  }
  updateClick(){
    // naviguer vers le updateComponent
  }

  ngOnInit(): void {

   // console.log(' dashboardWidget', this.dashboardWidget);
    let dataSource: DataSource =  this.dashboardWidget.widget.query.dataSource;
    //let mesures: any[][];
    this.dataSourceService.getData(dataSource).subscribe(
      (data) => {
        let dimension= [];
           data.forEach(elm => {
          dimension.push(elm.date);
          //console.log(elm.nameOfDimension);
        });
        let mesure2=[];
        data.forEach(elm => {
          mesure2.push(elm.positive);
        });

        let mesure1=[];
        data.forEach(elm => {
          mesure1.push(elm.negative);
        });
      // data.forEach(elm => mesure2.push(elm.nameOfmesure));
       this.basicData = {
  
        labels: dimension,
        datasets: [
   
            {
                label: this.dashboardWidget.widget.query.mesure2 ,
                backgroundColor: '#FFA726',
                data: mesure2
            },

            {
              label: this.dashboardWidget.widget.query.mesure1 ,
              backgroundColor: '#AAA423',
              data: mesure1
          }
        ]
    };

      },
      (error) => {
      console.log('error ' );
      },
      () => {
      console.log('complete');
      }
      );
  }

}
