import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { DataSourceService } from 'src/app/data-source/services/data-source.service';
import { MetaDataSource } from 'src/app/widget/models/meta-data-source.model';
import { Widget } from 'src/app/widget/models/widget.model';
import { WidgetsService } from 'src/app/widget/services/widgets.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  results = [];
  allKeys: MetaDataSource[] = [];
  labelsWrited = false;
  widget: Widget;
  customTable: any;

  constructor(
    private dataSourceService: DataSourceService,
    private widgetService: WidgetsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.widgetService.currentWidget.subscribe(widget => this.widget = widget);
    this.dataSourceService.getDataFrom(this.widget.dataSource).subscribe(
      (data) => {
        this.results = data;
        for (const key in data[0]){
            if (!this.widget.metaDataSources.find(elm => elm.key === key)){
            this.allKeys.push({id: UUID.UUID(), key, label: key, isDimension: false});
            }
          }
      });
  }

  onSelectedKey(key: string, id: string): void {
    this.widget.metaDataSources.push({ id, key, label: key, isDimension: false});
    this.removeSelectedKeyFromFirstList(id);
    this.customTable = [];
    this.widget.metaDataSources.forEach(elm => {
      this.customTable.push(elm.key);
    });
  }

  onRemovedKey(key: string, id: string): void {
    this.allKeys.push({id, key, label: key, isDimension: false});
    this.removeSelectedKeyFromSecondList(id);
    this.customTable = [];
    this.widget.metaDataSources.forEach(elm => {
      this.customTable.push(elm.key);
    });
  }
  removeSelectedKeyFromFirstList(id: string): void {
    const removeIndex = this.allKeys.map((item) => item.id ).indexOf(id);
    this.allKeys.splice(removeIndex, 1);
  }
  removeSelectedKeyFromSecondList(id: string): void {
    const removeIndex = this.widget.metaDataSources.map((item) => item.id ).indexOf(id);
    this.widget.metaDataSources.splice(removeIndex, 1);
  }

}
