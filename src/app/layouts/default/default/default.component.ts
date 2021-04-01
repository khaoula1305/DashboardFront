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
  add = false;
  load=false;
  constructor(private dashboardService: DashboardsService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.dashboardService.getDashboard(id).subscribe(
      data => {
        this.dashboard = data;
      },
      (error) => {
        console.log('error ');
      },
      () => {
        this.load=true;
      }
    );
  }

  onHiddenClick(state){
  this.add = false;
  console.log('state hidden', state);
}

  addWidget(){
    this.add = true;
  }

}
