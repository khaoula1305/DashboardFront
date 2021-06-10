import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { DataSourceService } from 'src/app/data-source/services/data-source.service';
import { MetaDataSource } from 'src/app/widget/models/meta-data-source.model';
import { Widget } from 'src/app/widget/models/widget.model';
import { WidgetsService } from 'src/app/widget/services/widgets.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit {
  results = [];
  allKeys: MetaDataSource[] = [];
  cardKey: MetaDataSource;
  cardRes = 0;
  newCard = false;
  updateCard = false;

  widget: Widget;

  constructor(
    private dataSourceService: DataSourceService,
    private widgetService: WidgetsService
  ) {}

  ngOnInit(): void {
    this.widgetService.currentWidget.subscribe(
      (widget) => (this.widget = widget)
    );
    this.dataSourceService
      .getDataFrom(this.widget.dataSource)
      .subscribe((data) => {
        this.results = data;
        for (const key in data[0]) {
          this.allKeys.push({
            id: UUID.UUID(),
            key,
            label: key,
            isDimension: false,
          });
        }
        if (this.widget.metaDataSources.length != 0){
      this.results.forEach((elm) => (this.cardRes += elm[this.cardKey.key]));
        }
      });
    if (this.widget.metaDataSources.length == 0) {
      this.newCard = true;
    }
    else {
      this.updateCard = true;
      this.cardKey = this.widget.metaDataSources[0];
    }
  }

  onSelectedDimension(event): void {
    if (this.cardKey != undefined) {
      this.allKeys.push(this.cardKey);
      const removeIndex = this.widget.metaDataSources
        .map(function(item) {
          return item.id;
        })
        .indexOf(this.cardKey.id);
      this.widget.metaDataSources.splice(removeIndex, 1);
    }
    this.cardKey = event;
    const removeIndex = this.allKeys
      .map(function(item) {
        return item.id;
      })
      .indexOf(this.cardKey.id);
    this.allKeys.splice(removeIndex, 1);
    this.widget.metaDataSources.push(this.cardKey);
    this.cardRes = 0;
    this.results.forEach((elm) => (this.cardRes  += elm[this.cardKey.key]));
  }
}
