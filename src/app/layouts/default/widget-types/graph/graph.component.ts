import { Component, Input, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { DataSource } from 'src/app/models/data-source.model';
import { MetaDataSource } from 'src/app/models/meta-data-source.model';
import { WidgetType } from 'src/app/models/widget-type';
import { DataSourceService } from 'src/app/services/data-source.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  dimensionKey: MetaDataSource;
  queries: DataSource[];
  selectedQuery: DataSource;
  results = [];
  allKeys: MetaDataSource[] = [];
  selectedKeys: MetaDataSource[] = [];
  showKeys = false;
  preview = false;
  labelsWrited = false;
  drawType = false;
  //chart
  labels: any[] = [];
  datasets: any[] = [];
  basicData;
  showQueries=false;
  @Input() selectedWidgetType: WidgetType;

  constructor(private dataSourceService: DataSourceService) { }

  ngOnInit(): void {
    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        this.queries = data;
      }
    );
  }

  onSelectedDimension(event) {
    if (this.dimensionKey != undefined) {
      this.allKeys.push(this.dimensionKey);
      this.labels = [];
      var removeIndex = this.selectedKeys.map(function (item) { return item.id; }).indexOf(this.dimensionKey.id);
      this.selectedKeys.splice(removeIndex, 1);
    }
    this.dimensionKey = event;
    this.dimensionKey.isDimension = true;
    this.results.forEach(elm => this.labels.push(elm[this.dimensionKey.key]));
    var removeIndex = this.allKeys.map(function (item) { return item.id; }).indexOf(this.dimensionKey.id);
    this.allKeys.splice(removeIndex, 1);
    this.selectedKeys.push(this.dimensionKey);
  }

  onSelectedKey(key: string, id: string) {

    this.selectedKeys.push({ id, key, label: key, isDimension: false });
    if (this.selectedKeys.length == 0) this.preview = true;
    else this.preview = false;
    this.removeSelectedKeyFromFirstList(id);
    this.labelsWrited = true;
    this.onSelectedMesure({ id, key, label: key, isDimension:false});
  }

  onSelectedMesure(data: MetaDataSource) {
    var objet: any;
    var label = [];
    this.results.forEach(elm => label.push(elm[data.key]));
    objet = {
      label: data.label,
      backgroundColor: this.generateColor(),
      data: label
    };
    this.datasets.push(objet);
  }

  onRemovedKey(key: string, id: string) {

    this.allKeys.push({ id, key, label: key, isDimension: false });
    this.removeSelectedKeyFromSecondList(id);

  }
  removeSelectedKeyFromFirstList(id: string) {

    var removeIndex = this.allKeys.map(function (item) { return item.id; }).indexOf(id);
    this.allKeys.splice(removeIndex, 1);
  }
  removeSelectedKeyFromSecondList(id: string) {
    var removeIndex = this.selectedKeys.map(function (item) { return item.id; }).indexOf(id);
    this.selectedKeys.splice(removeIndex, 1);
    if (this.selectedKeys.length == 0) this.preview = true;
    else this.preview = false;
  }
  generateColor() {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);

  }

  draw() {
    this.drawType = true;
    this.basicData = { labels: this.labels, datasets: this.datasets };
  }
  onSelectedQuery() {
    this.showKeys = true;
    this.dataSourceService.getDataFrom(this.selectedQuery).subscribe(
      (data) => {
        this.results = data;
        for (let key in data[0]) {
          this.allKeys.push({ id: UUID.UUID(), key, label: key, isDimension: false });
        }
      });
  }

}
