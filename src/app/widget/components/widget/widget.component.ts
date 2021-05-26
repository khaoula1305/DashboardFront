import { Component, Input, OnInit } from '@angular/core';
import { Widget } from 'src/app/widget/models/widget.model';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  @Input() widget: Widget;
  hoverStyle;
  constructor() { }

  ngOnInit(): void {
  }
  hover(){
  this.hoverStyle = {
      'background-color':  '#f6f6f6',
    };
  }
  notHover(){
    this.hoverStyle = {};
  }

}
