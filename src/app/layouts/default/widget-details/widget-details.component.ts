import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import autoTable from 'jspdf-autotable';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DashboardWidget } from 'src/app/models/dashboard-widget';
import { MetaDataSource } from 'src/app/models/meta-data-source.model';
import { Widget } from 'src/app/models/widget.model';
import { WidgetTypeEnum } from 'src/app/models/widgetTypeEnum';
import { DataSourceService } from 'src/app/services/data-source.service';
import { WidgetsService } from 'src/app/services/widgets.service';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
//declare let jsPDF;

@Component({
  selector: 'app-widget-details',
  templateUrl: './widget-details.component.html',
  styleUrls: ['./widget-details.component.scss']
})
export class WidgetDetailsComponent implements OnInit {

  @Input() widget: Widget;
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
  loadExport=false;

  constructor(
    private widgetService: WidgetsService,
    private dataSourceService: DataSourceService,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    var myLabels = [];
    var objet: any;
    this.widgetService.getAllWidgets().subscribe(
      (data) => {
        this.widget = data.find((e) => e.id == this.widget.id);
        this.widgetType = this.widget.widgetType.type;
        this.dataSourceService
          .getDataFrom(this.widget.dataSource)
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
                      key: elm[this.widget.metaDataSources[0].key],
                      label: this.widget.metaDataSources[0].label,
                    };
                  });
                  break;
                }
                default: {
                  this.dimensionKey = this.widget.metaDataSources.find(
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
                    this.widget.metaDataSources.forEach((element) => {
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
                    });
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
      },
      (err) => console.log(err),
      () => (this.load = true)
    );

  }

  generateColor() {
    return (
      '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
  }

  onExportPdf(){
  var pdf = new jsPDF();
  pdf.text(this.widget.title, 11, 8);
  pdf.setFontSize(12);
  pdf.setTextColor(99);
let headers=[];
let object=[];
this.widget.metaDataSources.forEach(elm => {
  object.push(elm.label);
})
  let content=[];
  this.results.forEach(item=> {
    let obj=[];
    this.widget.metaDataSources.forEach(elm=> {
    obj.push(item[elm.key]);
    });
    content.push(obj);
  });
 headers[0]=object;
  (pdf as any).autoTable({
  head: headers,
  body: content,
  theme: 'plain',
  didDrawCell: data => {
     // console.log(data.column.index)
  }
  })
  // Open PDF document in browser's new tab
  pdf.output('dataurlnewwindow')
  //pdf.save(this.widget.title+'.pdf');
}  
}
