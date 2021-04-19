import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { DashboardWidget } from 'src/app/models/dashboard-widget';
import { DataSource } from 'src/app/models/data-source.model';
import { MetaDataSource } from 'src/app/models/meta-data-source.model';
import { WidgetType } from 'src/app/models/widget-type';
import { Widget } from 'src/app/models/widget.model';
import { DataSourceService } from 'src/app/services/data-source.service';
import { WidgetTypeService } from 'src/app/services/widget-type.service';
import { WidgetsService } from 'src/app/services/widgets.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  dimensionKey: MetaDataSource;
  selectedQuery: DataSource;
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
  @Input() selectedWidgetType: WidgetType;
  @Input() dashWidget: DashboardWidget;
   widget: Widget;

  @Output() added = new EventEmitter<any>();

  newWidget = false;
  previewOnUpdate = false;
  myVar="";

  constructor(private dataSourceService: DataSourceService, private widgetService: WidgetsService) { }

  ngOnInit(): void {
    this.widgetService.currentWidget.subscribe(widget => this.widget = widget);

    if(this.dimensionKey==null){
      this.dimensionKey = this.widget.metaDataSourceDataModels[0];
    }

    console.log('curent widget from graph ngOninit ');
    this.widgetService.getCurrentWidget();

    this.dataSourceService.getDataFrom(this.widget.dataSource).subscribe(
      (data) => {
        this.results = data;
        for (let key in data[0]) {
          this.allKeys.push({ id: UUID.UUID(), key, label: key, isDimension: false });
        }
      });

    if (this.dashWidget == null) this.newWidget = true;
    else {
      this.previewOnUpdate = true;
      //this.dimensionKey = this.dashWidget.widget.metaDataSourceDataModels.find(elm => elm.isDimension == true);
      this.selectedQuery = this.dashWidget.widget.dataSource;
      this.onSelectedQuery();
     // this.selectedKeys = this.dashWidget.widget.metaDataSourceDataModels;
      this.dimensionKey = this.dashWidget.widget.metaDataSourceDataModels.find(elm => elm.isDimension == true)
    }
  }

  onSelectedDimension(event) {
    console.log('dimensionKey', this.dimensionKey);
    console.log('event', event);
    if (this.dimensionKey != undefined) {
      this.allKeys.push(this.dimensionKey);
      this.labels = [];
      var removeIndex = this.widget.metaDataSourceDataModels.map(function (item) { return item.id; }).indexOf(this.dimensionKey.id);
      this.widget.metaDataSourceDataModels.splice(removeIndex, 1);
    }
    this.dimensionKey = event;
    this.dimensionKey.isDimension = true;
    //this.results.forEach(elm => this.labels.push(elm[this.dimensionKey.key]));
    var removeIndex = this.allKeys.map(function (item) { return item.id; }).indexOf(this.dimensionKey.id);
    this.allKeys.splice(removeIndex, 1);
    this.widget.metaDataSourceDataModels.push(this.dimensionKey);
  }

  onSelectedKey(key: string, id: string) {

    this.widget.metaDataSourceDataModels.push({ id, key, label: key, isDimension: false });
    if (this.widget.metaDataSourceDataModels.length == 0) this.preview = true;
    else this.preview = false;
    this.removeSelectedKeyFromFirstList(id);
    this.labelsWrited = true;
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
    var removeIndex = this.widget.metaDataSourceDataModels.map(function (item) { return item.id; }).indexOf(id);
    this.widget.metaDataSourceDataModels.splice(removeIndex, 1);
    if (this.widget.metaDataSourceDataModels.length == 0) this.preview = true;
    else this.preview = false;
  }
  generateColor() {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);

  }

  draw() {
    
    this.datasets = [];
    this.drawType = true;
    this.widget.metaDataSourceDataModels.forEach(elm => {
      if (!elm.isDimension)
        this.onSelectedMesure(elm);
    });
    this.results.forEach(elm => this.labels.push(elm[this.dimensionKey.key]));
    this.basicData = { labels: this.labels, datasets: this.datasets };

    console.log('curent widget from graph just after draw');
    this.widgetService.getCurrentWidget();


    
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

  onSendData() {
    //this.widget.metaDataSourceDataModels = this.selectedKeys;
   // this.widgetService.setCurrentWidget(this.widget);
   

    this.added.emit(this.widget);
    
  }

}
