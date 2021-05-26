import { Component, Input, OnInit } from '@angular/core';
import { Widget } from 'src/app/widget/models/widget.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { WidgetTypeEnum } from '../../models/widgetTypeEnum';
import { DataSourceService } from 'src/app/data-source/services/data-source.service';

@Component({
  selector: 'app-widget-details',
  templateUrl: './widget-details.component.html',
  styleUrls: ['./widget-details.component.scss']
})
export class WidgetDetailsComponent implements OnInit {

  @Input() widget: Widget;
  @Input() title: string;
  @Input() results: any[];
  @Input() cardResults: any ;
  @Input() chartResults: any;
  widgetTypeEnum = WidgetTypeEnum;
  exportColumns: any[];
  loadExport = false;
  customTable: any[];
  load = false;

  constructor( private dataSourceService: DataSourceService) {}
  ngOnInit(): void {
    if (this.title == undefined){
      this.title = this.widget.title;
      this.dataSourceService.getDataFrom(this.widget.dataSource).subscribe(
        (data) => {
          this.results = data;
          switch (this.widget.widgetType.type) {
            case this.widgetTypeEnum.Table: {
              this.customTable = [];
              this.widget.metaDataSources.forEach(elm => {
                this.customTable.push(elm.key);
              });
              break;
            }
            case this.widgetTypeEnum.Card: {
              this.results.forEach((elm) => {
                this.cardResults = {
                  key: elm[this.widget.metaDataSources[0].key],
                  label: this.widget.metaDataSources[0].label,
                };
              });
              break;
            }
            default: {
              const datasets: any[] = [];
              let object: any;
              const myLabels = [];
              const dimensionKey = this.widget.metaDataSources.find(
                (elm) => elm.isDimension == true
              );
              if (dimensionKey) {
                this.results.forEach((elm) => {
                  let repeat = true;
                  for (const value of myLabels) {
                    if (value == elm[dimensionKey.key]) {
                      repeat = false;
                      break;
                    }
                  }
                  if (repeat) { myLabels.push(elm[dimensionKey.key]); }
                });
                this.widget.metaDataSources.forEach((element) => {
                  if (!element.isDimension) {
                    const label = [];
                    this.results.forEach((elm) =>
                      label.push(elm[element.key])
                    );
                    object = {
                      label: element.label,
                      backgroundColor: this.generateColor(),
                      data: label,
                    };
                    datasets.push(object);
                  }
                });
              }
              this.chartResults = {
                labels: myLabels,
                datasets,
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
    }
   else{
     this.load = true;
     if (this.widget.widgetType.type == this.widgetTypeEnum.Table){
      this.customTable = [];
      this.widget.metaDataSources.forEach(elm => {
        this.customTable.push(elm.key);
      });
    }
  }
  }
  generateColor() {
    return (
      '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
  }
  onExportPdf(){
  const pdf = new jsPDF();
  pdf.text(this.title, 11, 8);
  pdf.setFontSize(12);
  pdf.setTextColor(99);
  const headers = [];
  const object = [];
  this.widget.metaDataSources.forEach(elm => {
  object.push(elm.label);
});
  const content = [];
  this.results.forEach(item => {
    const obj = [];
    this.widget.metaDataSources.forEach(elm => {
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
  // pdf.output('dataurlnewwindow')
  pdf.save(this.title + '.pdf');
}

}
