import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-panel',
  templateUrl: './widget-panel.component.html',
  styleUrls: ['./widget-panel.component.scss']
})
export class WidgetPanelComponent implements OnInit {
  visualisationType: Array<any>= new Array();
  constructor() { 

  }

  ngOnInit(): void {
    let i;
    for(i=0; i<10; i++){
      this.visualisationType.push("graph type "+i);
    }
  
  }

}
