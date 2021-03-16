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
  }
  updateClick(){
    // naviguer vers le updateComponent
  }

  ngOnInit(): void {

   const dataSource: DataSource =  this.dashboardWidget.widget.query.dataSource;
   this.dataSourceService.getData(dataSource).subscribe(
      (data) => {
        // const dimension = [];
        // data.forEach(elm => {
        //   dimension.push(elm.date);
        // });
        const dimension = [];
        this.dashboardWidget.widget.query.dataTable.forEach(elm => {
          dimension.push(elm.dimension);
        });
     /*    const mesure2 = [];
        data.forEach(elm => {
          mesure2.push(elm.positive);
        });
         */
        const mesure2 = [];
        this.dashboardWidget.widget.query.dataTable.forEach(elm => {
          mesure2.push(elm.mesure2);
        });

        /*const mesure1 = [];
        data.forEach(elm => {
          mesure1.push(elm.negative);
        });*/
        const mesure1 = [];
        this.dashboardWidget.widget.query.dataTable.forEach(elm => {
          mesure1.push(elm.mesure1);
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
              data:  mesure1
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
