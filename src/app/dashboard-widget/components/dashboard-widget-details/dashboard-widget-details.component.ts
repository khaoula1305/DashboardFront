import { Component, Input, OnInit } from '@angular/core';
import { DashboardWidget } from 'src/app/dashboard-widget/models/dashboard-widget';
import { MetaDataSource } from 'src/app/widget/models/meta-data-source.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DashboardWidgetService } from '../../services/dashboard-widget.service';
import { WidgetTypeEnum } from 'src/app/widget/models/widgetTypeEnum';
import { DataSourceService } from 'src/app/data-source/services/data-source.service';

@Component({
  selector: 'app-dashboard-widget-details',
  templateUrl: './dashboard-widget-details.component.html',
  styleUrls: ['./dashboard-widget-details.component.scss'],
})
export class DashboardWidgetDetailsComponent implements OnInit {
  @Input() dashboardWidget: DashboardWidget;
  results = [];
  widgetType: string;
  widgetTypeEnum = WidgetTypeEnum;
  result;
  dimensionKey: MetaDataSource;
  datasets: any[] = [];
  basicData: any;
  load = false;
  exportColumns: any[];
  cols: any[];
  loadExport = false;
  customTable:any;

  constructor(
    private dashboardWidgetService: DashboardWidgetService,
    private dataSourceService: DataSourceService
  ) {}

  ngOnInit(): void {
    var myLabels = [];
    var objet: any;
    this.widgetType = this.dashboardWidget.widget.widgetType.type;
    this.dataSourceService
      .getDataFrom(this.dashboardWidget.widget.dataSource)
      .subscribe(
        (data) => {
          this.results = data;
          switch (this.widgetType) {
            case this.widgetTypeEnum.Table: {
              break;
            }
            case this.widgetTypeEnum.Card: {
              this.results.forEach((elm) => {
                this.result = {
                  key: elm[this.dashboardWidget.widget.metaDataSources[0].key],
                  label: this.dashboardWidget.widget.metaDataSources[0].label,
                };
              });
              break;
            }
            default: {
              this.dimensionKey = this.dashboardWidget.widget.metaDataSources.find(
                (elm) => elm.isDimension == true
              );
              if (this.dimensionKey) {
                this.results.forEach((elm) => {
                  let repeat = true;
                  for (let index = 0; index < myLabels.length; index++) {
                    if (myLabels[index] == elm[this.dimensionKey.key]) {
                      repeat = false;
                      break;
                    }
                  }
                  if (repeat) myLabels.push(elm[this.dimensionKey.key]);
                });
                this.dashboardWidget.widget.metaDataSources.forEach(
                  (element) => {
                    if (!element.isDimension) {
                      var label = [];
                      this.results.forEach((elm) =>
                        label.push(elm[element.key])
                      );
                      objet = {
                        label: element.label,
                        backgroundColor: this.generateColor(),
                        data: label,
                      };
                      this.datasets.push(objet);
                    }
                  }
                );
              }
              this.basicData = {
                labels: myLabels,
                datasets: this.datasets,
              };
              break;
            }
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.load = true;
        }
      );
      this.customTable=[];
      this.dashboardWidget.widget.metaDataSources.forEach(elm=>{
        this.customTable.push(elm.key);
      });
  }

  generateColor() {
    return (
      '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
  }

  onExportPdf() {
    var pdf = new jsPDF();
    pdf.text(this.dashboardWidget.title, 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);
    let headers = [];
    let object = [];
    this.dashboardWidget.widget.metaDataSources.forEach((elm) => {
      object.push(elm.label);
    });
    let content = [];
    this.results.forEach((item) => {
      let obj = [];
      this.dashboardWidget.widget.metaDataSources.forEach((elm) => {
        obj.push(item[elm.key]);
      });
      content.push(obj);
    });
    headers[0] = object;
    (pdf as any).autoTable({
      head: headers,
      body: content,
      theme: 'plain',
    });
    // Open PDF document in browser's new tab
    //pdf.output('dataurlnewwindow');
    pdf.save(this.dashboardWidget.title + '.pdf');
  }
}
