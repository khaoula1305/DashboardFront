import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { DataSource } from 'src/app/models/data-source.model';
import { MetaDataSource } from 'src/app/models/meta-data-source.model';
import { DataSourceService } from 'src/app/services/data-source.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {

  queries: DataSource[];
  selectedQuery: DataSource;
  results = [];
  allKeys: MetaDataSource[]=[];
  showKeys=false;
  cardKey:MetaDataSource;
  selectedKey: MetaDataSource[] = [];
  cardRes;
  preview=false;
  showPreview=false;
  @Output() added = new EventEmitter<any>();

  constructor(private dataSourceService: DataSourceService) { }

  ngOnInit(): void {
    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        this.queries = [];
        data.forEach(elm => {
          this.dataSourceService.getDataFrom(elm).subscribe(
            (dataBody) => {
              if(dataBody.length==1){
                 this.queries.push(elm);
              }
            }
          );
        })
      }
    );
  }

  onSelectedQuery() {
    this.showKeys = true;
    this.dataSourceService.getDataFrom(this.selectedQuery).subscribe(
      (data) => {
        this.results = data;
        console.log('selected query', this.results.length);
        for(let key in data[0]){
          this.allKeys.push({id: UUID.UUID(),key, label: key, isDimension:false});
        }
      });
  }

  onSelectedDimension(event) {
    if (this.cardKey != undefined) {
      this.allKeys.push(this.cardKey);
      var removeIndex = this.selectedKey.map(function (item) { return item.id; }).indexOf(this.cardKey.id);
      this.selectedKey.splice(removeIndex, 1);
    }
    this.cardKey = event;
    var removeIndex = this.allKeys.map(function (item) { return item.id; }).indexOf(this.cardKey.id);
    this.allKeys.splice(removeIndex, 1);
    this.selectedKey.push(this.cardKey);
    this.results.forEach(elm => this.cardRes = elm[this.cardKey.key]);
    if (this.cardRes.length == 0) this.preview = true;
    else this.preview = false;

  }
  showCard(){
    this.preview=true;
    this.showPreview=true;
  }
  onSendData() {

    this.added.emit([this.selectedKey, this.selectedQuery]);
  }
}
