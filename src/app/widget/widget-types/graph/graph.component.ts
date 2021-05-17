import { Component, Input, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { MetaDataSource } from 'src/app/widget/meta-data-source.model';
import { Widget } from 'src/app/widget/widget.model';
import { DataSourceService } from 'src/app/data-source/data-source.service';
import { WidgetsService } from 'src/app/widget/widgets.service';
import { element } from 'protractor';

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
  basicData;
  showQueries = false;
  widget: Widget;
  dimension:MetaDataSource;
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
        for(let key in data[0]){
          if(!this.widget.metaDataSources.find(elm=>elm.key==key)){
          this.allKeys.push({id: UUID.UUID(),key, label: key, isDimension:false});
          }
        } 
      });
      this.dimensionKey = this.widget.metaDataSources.find((elm) => elm.isDimension == true);
      if(this.dimensionKey != undefined){
        this.dimension=this.dimensionKey;
        this.allKeys.push(this.dimension);
      }

  }

  onSelectedDimension(event) {
    if (this.dimensionKey != undefined) {
      this.allKeys.push(this.dimensionKey);
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

CreateBasicData(){
  if (this.dimensionKey == null) { //set first item in dimension key if switching from table to graph
    this.widget.metaDataSources[0].isDimension = true;
    this.dimensionKey = this.widget.metaDataSources[0];
  }
  this.drawType = true;
  var labels=[];
  var dimensions=[];
  this.widget.metaDataSources.forEach(element=>{
    if(!element.isDimension){
      if(this.widget.widgetType.type=="pie"){
        labels.push( { label: element.label, key:element.key,  backgroundColor: [], data:[]} );
      }
      else labels.push( { label: element.label, key:element.key, backgroundColor: this.generateColor(), data:[]} );
    }
  })
  this.results.forEach((elm) => {
    let repeat=true;
    for (let index = 0; index < dimensions.length; index++) {
     if(dimensions[index]== elm[this.dimensionKey.key]){
      repeat=false;
      labels.forEach(lab=>{
        lab.data[index]+=elm[lab.key];
      })
       break;
     }
    }
    if(repeat) {
      dimensions.push(elm[this.dimensionKey.key]);
      labels.forEach( lab=>{
        if(this.widget.widgetType.type=="pie") lab.backgroundColor.push(this.generateColor());
        lab.data.push(elm[lab.key]);
      })
    }
  });
  this.basicData = { labels: dimensions, datasets: labels };
}

}
