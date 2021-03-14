import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  GridsterItemComponentInterface, GridsterItem }  from 'angular-gridster2';
import { Dashboard } from 'src/app/models/dashboard.model';
import { DashboardsService } from 'src/app/services/dashboards.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  static itemChange: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
  static itemResize: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
  dashboard: Dashboard;
  add=false;
  constructor(private widgetDashboardService: DashboardsService, private route: ActivatedRoute) { }
  
  
  ngOnInit(): void {
    
    let title = this.route.snapshot.params["title"];
    console.log('title', title);
    this.widgetDashboardService.getAllDashboards().subscribe(
      data=>{
        console.log('data', data);
        this.dashboard = data.filter(dash => dash.title == title)[0];
        console.log('dash ', this.dashboard);
      }
    );
  }
  
  onHiddenClick(state){
  this.add = false;
  console.log('state hidden', state);
}

  addWidget(){
    this.add= true;
  }

}
