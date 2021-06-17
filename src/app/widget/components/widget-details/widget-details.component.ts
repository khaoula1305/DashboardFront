import { Component, Input, OnInit } from '@angular/core';
import { Widget } from 'src/app/widget/models/widget.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { GraphEnum, WidgetTypeEnum } from '../../models/widgetTypeEnum';
import { DataSourceService } from 'src/app/data-source/services/data-source.service';
import { Constants } from 'src/app/constants/constants';

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
  graphEnum = GraphEnum;
  staticWidget: boolean;

  constructor( private dataSourceService: DataSourceService) {}
  ngOnInit(): void {
    this.staticWidget = (this.widget.widgetType.type === this.widgetTypeEnum.Currency);
    if (this.title === undefined){
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
              this.createBasicData();
              break;
            }
          }
        },
        (error) => {
        },
        () => {
          this.load = true;
        }
      );
    }
   else{
     this.load = true;
     if (this.widget.widgetType.type === this.widgetTypeEnum.Table){
      this.customTable = [];
      this.widget.metaDataSources.forEach(elm => {
        this.customTable.push(elm.key);
      });
    }
  }
  }
    // Generate the data that we will be used in the chart
    createBasicData(): void {
      const labels = [];
      const dimensions = [];
      const dimension = this.widget.metaDataSources.find( e => e.isDimension === true);
      this.widget.metaDataSources.forEach(element => {
        if (!element.isDimension){
          if (this.widget.widgetType.type === this.graphEnum.Pie){
          labels.push( { label: element.label, key: element.key,  backgroundColor: [], data: []} );
        }
        else { labels.push( { label: element.label, key: element.key, backgroundColor: this.generateColor(), data: []} ); }
           }
      });
      this.results.forEach((elm) => {
        let repeat = true;
        for (let index = 0; index < dimensions.length; index++) {
         if (dimensions[index] === elm[dimension.key]){
          repeat = false;
          labels.forEach(lab => {
            lab.data[index] += elm[lab.key];
          });
          break;
         }
        }
        if (repeat) {
          dimensions.push(elm[dimension.key]);
          labels.forEach( lab => {
          if (this.widget.widgetType.type === this.graphEnum.Pie) { lab.backgroundColor.push(this.generateColor()); }
          lab.data.push(elm[lab.key]);
          });
        }
      });
      this.chartResults = { labels: dimensions, datasets: labels };
    }
    generateColor(): string {
      return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    }
  onExportPdf(): void {
  const pdf = new jsPDF();
  pdf.text(this.title, Constants.coordX, Constants.coordY);
  pdf.setFontSize(Constants.fontSize);
  pdf.setTextColor(Constants.textColor);
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
  pdf.save(this.title + '.pdf');
}

}
