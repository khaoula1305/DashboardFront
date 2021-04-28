import { Component, Input, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { MetaDataSource } from 'src/app/models/meta-data-source.model';
import { Widget } from 'src/app/models/widget.model';
import { DataSourceService } from 'src/app/services/data-source.service';
import { WidgetsService } from 'src/app/services/widgets.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  dimensionKey: MetaDataSource;
  results = [];
  allKeys: MetaDataSource[] = [];
  //selectedKeys: MetaDataSource[] = [];
  showKeys = false;
  preview = false;
  labelsWrited = false;
  drawType = false;
  //chart
  labels: any[] = [];
  datasets: any[] = [];
  basicData;
  showQueries = false;
  widget: Widget;

  newWidget = false;
  previewOnUpdate = false;
  myVar = '';

  constructor(
    private dataSourceService: DataSourceService,
    private widgetService: WidgetsService
  ) { }

  ngOnInit(): void {
    this.widgetService.currentWidget.subscribe(
      (widget) => (this.widget = widget)
    );
    this.dataSourceService
      .getDataFrom(this.widget.dataSource)
      .subscribe((data) => {
        this.results = data;
        for (let key in data[0]) {
          this.allKeys.push({
            id: UUID.UUID(),
            key,
            label: key,
            isDimension: false,
          });
        }
      });
    //for the create 
    if (this.widget.metaDataSources.length == 0) {
      this.newWidget = true;
    }
    else { //for the update 
      if (this.dimensionKey == null) {
        this.dimensionKey = this.widget.metaDataSources[0];
      }
      this.previewOnUpdate = true;
      this.dimensionKey = this.widget.metaDataSources.find(
        (elm) => elm.isDimension == true
      );
    }
  }

  onSelectedDimension(event) {
    if (this.dimensionKey != undefined) {
      this.allKeys.push(this.dimensionKey);
      this.labels = [];
      var removeIndex = this.widget.metaDataSources
        .map(function (item) {
          return item.id;
        })
        .indexOf(this.dimensionKey.id);
      this.widget.metaDataSources.splice(removeIndex, 1);
    }
    this.dimensionKey = event;
    this.dimensionKey.isDimension = true;
    var removeIndex = this.allKeys
      .map(function (item) {
        return item.id;
      })
      .indexOf(this.dimensionKey.id);
    this.allKeys.splice(removeIndex, 1);
    this.widget.metaDataSources.push(this.dimensionKey);
  }

  onSelectedKey(key: string, id: string) {
    this.widget.metaDataSources.push({
      id,
      key,
      label: key,
      isDimension: false,
    });
    if (this.widget.metaDataSources.length == 0) this.preview = true;
    else this.preview = false;
    this.removeSelectedKeyFromFirstList(id);
    this.labelsWrited = true;
  }

  onSelectedMesure(data: MetaDataSource) {
    var objet: any;
    var label = [];
    this.results.forEach((elm) => label.push(elm[data.key]));
    objet = {
      label: data.label,
      backgroundColor: this.generateColor(),
      data: label,
    };
    this.datasets.push(objet);
  }

  onRemovedKey(key: string, id: string) {
    this.allKeys.push({ id, key, label: key, isDimension: false });
    this.removeSelectedKeyFromSecondList(id);
  }
  removeSelectedKeyFromFirstList(id: string) {
    var removeIndex = this.allKeys
      .map(function (item) {
        return item.id;
      })
      .indexOf(id);
    this.allKeys.splice(removeIndex, 1);
  }
  removeSelectedKeyFromSecondList(id: string) {
    var removeIndex = this.widget.metaDataSources
      .map(function (item) {
        return item.id;
      })
      .indexOf(id);
    this.widget.metaDataSources.splice(removeIndex, 1);
    if (this.widget.metaDataSources.length == 0) this.preview = true;
    else this.preview = false;
  }
  generateColor() {
    return (
      '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
  }

  draw() {
    this.datasets = [];
    this.labels = [];
    this.drawType = true;
    this.widget.metaDataSources.forEach((elm) => {
      if (!elm.isDimension) this.onSelectedMesure(elm);
    });
    if (this.dimensionKey == null) { //set first item in dimension key if switching from table to graph
      this.widget.metaDataSources[0].isDimension = true;
      this.dimensionKey = this.widget.metaDataSources[0];
    }
    this.results.forEach((elm) => {
      let repeat = true;
      for (let index = 0; index < this.labels.length; index++) {
        if (this.labels[index] == elm[this.dimensionKey.key]) {
          repeat = false;
          break;
        }

      }
      if (repeat) this.labels.push(elm[this.dimensionKey.key]);
    });
    this.basicData = { labels: this.labels, datasets: this.datasets };
  }

}
