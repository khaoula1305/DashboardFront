import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Widget } from 'src/app/widget/models/widget.model';
import { WidgetsService } from 'src/app/widget/services/widgets.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.scss']
})
export class WidgetPanelComponent implements OnInit {
  @Output() added = new EventEmitter<any>();
  @Output() hidden = new EventEmitter<any>();
  widgets: Widget[];
  searchText;
  constructor( private widgetsService: WidgetsService, private router: Router) { }
  hideClick(): void {
    this.hidden.emit(true);
  }
  ngOnInit(): void {
    this.widgetsService.getAllWidgets().subscribe(
    (response) => {
      this.widgets = response;
    }
    );
    }
    addClick(widget: Widget ): void {
      this.added.emit(widget);
    }
}
