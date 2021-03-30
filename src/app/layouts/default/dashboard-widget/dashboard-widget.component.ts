import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSourceService } from 'src/app/services/data-source.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetTypeEnum } from 'src/app/models/widgetTypeEnum';
import { DataSource } from 'src/app/models/data-source.model';
import { DashboardWidget } from 'src/app/models/dashboard-widget';

@Component({
  selector: 'app-dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss'],
})
export class DashboardWidgetComponent implements OnInit {
  @Output() deleted = new EventEmitter<any>();
  @Input() dashboardWidget: DashboardWidget;
  basicData: any;
  basicOptions: any;
  items: MenuItem[];
  widgetTitle: string;
  widgetTypeEnum = WidgetTypeEnum;
  isTable = false;
  isCard = false;
  isNumber = false;
  myTable;

  constructor(
    private dataSourceService: DataSourceService,
    private router: Router
  ) {}

  deleteClick() {
    this.deleted.emit(true);
  }
  ngOnInit(): void {
    if(this.dashboardWidget.widget){
      const typeWidget = this.dashboardWidget.widget.widgetType.type;
      switch (typeWidget) {
        case 'Table':
          this.isTable = true;
        case 'Card':
          this.isCard = true;
        case 'Card':
          this.isNumber = true;
      }
      const dataSource: DataSource =  this.dashboardWidget.widget.dataSource;
       this.dataSourceService.getDataFromURL(dataSource.url).subscribe(
      (data) => {
        //Ce traitement est static nous devons le remplacer
       const dimension = [];
      data.forEach(elm => {
       dimension.push(elm.date);
      });
      const mesure2 = [];
      data.forEach(elm => {
        mesure2.push(elm.positive);
          });
      const mesure1 = [];
          data.forEach(elm => {
            mesure1.push(elm.negative);
          });
      this.basicData = {
        labels: dimension,
        datasets: [
          {
            label: this.dashboardWidget.widget.dataSource.mesure1,
            backgroundColor: '#FFA726',
            data: mesure1,
          },
  
          {
            label: this.dashboardWidget.widget.dataSource.mesure2,
            backgroundColor: '#AAA423',
            data: mesure2,
          },
        ],
       };
      });
    }
   
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          this.router.navigate(['/updateWidget', this.widgetTitle]);
        },
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          this.deleteClick();
        },
      },
      { label: 'Show', icon: 'pi pi-info', url: '#' },
      { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/'] },
    ];
   
  }

  save(severity: any) {
    this.router.navigate(['/updateWidget', severity]);
  }
  dropdown(info: any) {
    this.widgetTitle = info;
  }
}
