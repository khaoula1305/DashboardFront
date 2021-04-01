import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSourceService } from 'src/app/services/data-source.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetTypeEnum } from 'src/app/models/widgetTypeEnum';
import { DataSource } from 'src/app/models/data-source.model';
import { DashboardWidget } from 'src/app/models/dashboard-widget';
import { DashboardsService } from 'src/app/services/dashboards.service';

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
  widgetId: any;
  widgetTypeEnum = WidgetTypeEnum;
  isTable = false;
  isCard = false;
  isNumber = false;
  dimension=[];
  mesure2=[];
  mesure1=[];
  results=[];

  constructor(
    private dataSourceService: DataSourceService,
    private dashboardsService: DashboardsService,
    private router: Router
  ) {}

  deleteClick() {
    this.deleted.emit(true);
  }
  ngOnInit(): void {
    if(this.dashboardWidget.widget){
      const typeWidget = this.dashboardWidget.widget.widgetType.type;
      switch (typeWidget) {
        case 'table':
          this.isTable = true;
        case 'card':
          this.isCard = true;
      }
    }
      this.dataSourceService.getDataFromURL(this.dashboardWidget.widget.dataSource.url).subscribe(
        (data) => {
          this.results=data;
          //Ce traitement est static nous devons le remplacer
          data.forEach(elm => {
            this.dimension.push(elm.date);
          });
          data.forEach(elm => {
            this.mesure2.push(elm.positive);
          });
          data.forEach(elm => {
            this.mesure1.push(elm.negative);
          });
        });

        this.basicData = {
          labels: this.dimension,
          datasets: [
            {
              label: "Negative Cases",
              backgroundColor: '#FFA726',
              data: this.mesure2
            },
            {
              label: "Positive Cases",
              backgroundColor: '#AAA423',
              data: this.mesure1
            }
          ]
        };

   
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          this.dashboardsService.currentDasboard= this.dashboardWidget.dashboard;
          this.router.navigate(['/updateWidget', this.widgetId]);
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
    this.widgetId = info;
  }
}
