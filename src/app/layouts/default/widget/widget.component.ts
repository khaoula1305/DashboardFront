import { Component, Input, OnInit } from '@angular/core';
import { Widget } from 'src/app/models/widget.model';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  @Input() widget: Widget;
  constructor() { }

  ngOnInit(): void {
    
  }

}
