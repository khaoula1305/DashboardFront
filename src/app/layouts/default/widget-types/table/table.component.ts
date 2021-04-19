import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { DataSource } from 'src/app/models/data-source.model';
import { MetaDataSource } from 'src/app/models/meta-data-source.model';
import { Widget } from 'src/app/models/widget.model';
import { DataSourceService } from 'src/app/services/data-source.service';
import { WidgetsService } from 'src/app/services/widgets.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  queries: DataSource[];
  selectedQuery: DataSource;
  results = [];
  allKeys: MetaDataSource[]=[];
 // selectedKeys: MetaDataSource[]=[];
  showKeys=false;
  preview=false;
  labelsWrited=false;
  drawType=false;
  widget: Widget;
  
  @Output() added = new EventEmitter<any>();

  constructor(
    private dataSourceService: DataSourceService,
    private widgetService: WidgetsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.widgetService.currentWidget.subscribe(widget => this.widget = widget);
    console.log('curent widget from table ');
    this.widgetService.getCurrentWidget();


    this.showKeys = true;
    this.dataSourceService.getDataFrom(this.widget.dataSource).subscribe(
      (data) => {
        this.results = data;
        for(let key in data[0]){
          this.allKeys.push({id: UUID.UUID(),key, label: key, isDimension:false});
        }
      });
  }


  onSelectedKey(key: string, id: string){

    this.widget.metaDataSourceDataModels.push({ id, key, label: key, isDimension:false});
    if(this.widget.metaDataSourceDataModels.length== 0) this.preview=true;
    else  this.preview=false;
    this.removeSelectedKeyFromFirstList(id);
    //this.labelsWrited=true;
  }

  onRemovedKey(key: string, id: string) {

    this.allKeys.push({id, key, label: key, isDimension:false});
    this.removeSelectedKeyFromSecondList(id);

  }
  removeSelectedKeyFromFirstList(id: string) {

    var removeIndex = this.allKeys.map(function (item) { return item.id; }).indexOf(id);
    this.allKeys.splice(removeIndex, 1);
  }
  removeSelectedKeyFromSecondList(id: string) {
    var removeIndex = this.widget.metaDataSourceDataModels.map(function (item) { return item.id; }).indexOf(id);
    this.widget.metaDataSourceDataModels.splice(removeIndex, 1);
    if(this.widget.metaDataSourceDataModels.length== 0) this.preview=true;
    else  this.preview=false;
  }

  drawTable(){
    this.drawType = true;
  }

  onSendData() {
   // this.widget.metaDataSourceDataModels = this.selectedKeys;

    this.added.emit(this.widget);
  }

}
