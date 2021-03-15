import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSourceService } from 'src/app/services/data-source.service';
import {DataSource} from 'src/app/models/data-source.model';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

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
  items: MenuItem[];
  widgetTitle: string;


  constructor(private dataSourceService: DataSourceService, private router: Router) { }

  deleteClick(){
    this.deleted.emit(true);
    console.log('widget ', this.dashboardWidget);
  }
  updateClick(){
    // naviguer vers le updateComponent
  }

  ngOnInit(): void {

   console.log(' dashboardWidget', this.dashboardWidget);
   const dataSource: DataSource =  this.dashboardWidget.widget.query.dataSource;
    // let mesures: any[][];
   this.dataSourceService.getData(dataSource).subscribe(
      (data) => {
        const dimension = [];
        data.forEach(elm => {
          dimension.push(elm.date);
          // console.log(elm.nameOfDimension);
        });
        const mesure2 = [];
        data.forEach(elm => {
          mesure2.push(elm.positive);
        });

        const mesure1 = [];
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

      this.items = [
        {label: 'Update', icon: 'pi pi-refresh', command: () => {
            this.router.navigate(['/updateWidget', this.widgetTitle]);
        }},
        {label: 'Delete', icon: 'pi pi-times', command: () => {
           this.deleteClick();
        }},
        {label: 'Show', icon: 'pi pi-info', url: '#'},
        {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/']}
    ];
  }

  save(severity: string) {
    this.router.navigate(['/updateWidget', severity]);
}
dropdown(info: string){
  this.widgetTitle=info;
}


}
