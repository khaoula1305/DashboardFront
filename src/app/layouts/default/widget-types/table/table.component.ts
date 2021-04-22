import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
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

  results = [];
  allKeys: MetaDataSource[]=[];
  labelsWrited=false;
  widget: Widget;
  constructor(
    private dataSourceService: DataSourceService,
    private widgetService: WidgetsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.widgetService.currentWidget.subscribe(widget => this.widget = widget);
    console.log('curent widget from table ');
    this.dataSourceService.getDataFrom(this.widget.dataSource).subscribe(
      (data) => {
        this.results = data;
        for(let key in data[0]){
          this.allKeys.push({id: UUID.UUID(),key, label: key, isDimension:false});
        }
      });
  }

  onSelectedKey(key: string, id: string){
    this.widget.metaDataSources.push({ id, key, label: key, isDimension:false});
    this.removeSelectedKeyFromFirstList(id);
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
    var removeIndex = this.widget.metaDataSources.map(function (item) { return item.id; }).indexOf(id);
    this.widget.metaDataSources.splice(removeIndex, 1);
  }

}
