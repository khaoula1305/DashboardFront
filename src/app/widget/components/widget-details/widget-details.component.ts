import { Component, Input, OnInit } from '@angular/core';
import { Widget } from 'src/app/widget/models/widget.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { WidgetTypeEnum } from '../../models/widgetTypeEnum';

@Component({
  selector: 'app-widget-details',
  templateUrl: './widget-details.component.html',
  styleUrls: ['./widget-details.component.scss']
})
export class WidgetDetailsComponent implements OnInit {

  @Input() widget: Widget;
  @Input() title: string;
  @Input() results;
  @Input() chartResults: any;
  widgetTypeEnum = WidgetTypeEnum;
  exportColumns: any[];
  loadExport=false;
  customTable:any;

  constructor() {}
  ngOnInit(): void {
          this.customTable=[];
          this.widget.metaDataSources.forEach(elm=>{
            this.customTable.push(elm.key);
          });
  }

  onExportPdf(){
  let pdf = new jsPDF();
  pdf.text(this.title, 11, 8);
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
  })
  // Open PDF document in browser's new tab
  //pdf.output('dataurlnewwindow')
  pdf.save(this.title+'.pdf');
}

}
