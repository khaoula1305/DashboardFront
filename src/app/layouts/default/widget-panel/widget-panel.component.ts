import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.scss']
})
export class WidgetPanelComponent implements OnInit {

  @Output() hidden = new EventEmitter<any>();
  constructor() { }

  hideClick(){
    console.log('widget ');
    this.hidden.emit(true);
  }

  ngOnInit(): void {
  }

}
