import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { DataSource } from 'src/app/models/data-source.model';
import { MetaDataSource } from 'src/app/models/meta-data-source.model';
import { DataSourceService } from 'src/app/services/data-source.service';

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
  selectedKeys: MetaDataSource[]=[];
  showKeys=false;
  preview=false;
  labelsWrited=false;
  drawType=false;
  
  @Output() added = new EventEmitter<any>();

  constructor(
    private dataSourceService: DataSourceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        this.queries = data;
      }
    );
  }

  onSelectedQuery() {
    this.showKeys = true;
    this.dataSourceService.getDataFrom(this.selectedQuery).subscribe(
      (data) => {
        this.results = data;
        for(let key in data[0]){
          this.allKeys.push({id: UUID.UUID(),key, label: key, isDimension:false});
        }
      });
  }

  onSelectedKey(key: string, id: string){

    this.selectedKeys.push({ id, key, label: key, isDimension:false});
    if(this.selectedKeys.length== 0) this.preview=true;
    else  this.preview=false;
    this.removeSelectedKeyFromFirstList(id);
    this.labelsWrited=true;
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
    var removeIndex = this.selectedKeys.map(function (item) { return item.id; }).indexOf(id);
    this.selectedKeys.splice(removeIndex, 1);
    if(this.selectedKeys.length== 0) this.preview=true;
    else  this.preview=false;
  }

  drawTable(){
    this.drawType = true;
  }

  onSendData() {

    this.added.emit([this.selectedKeys, this.selectedQuery]);
  }

}
