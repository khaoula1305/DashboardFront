import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import { DashboardsService } from 'src/app/services/dashboards.service';
import {Dashboard} from 'src/app/models/dashboard.model';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  nodes: TreeNode[];
  dashboards: Dashboard[];
  load=false;
  constructor(
    private dashboardService : DashboardsService) { }

  ngOnInit(): void {
    this.dashboardService.getAllDashboards().subscribe(
      (data) => {
        this.dashboards = data;
      },
      (error) => {
        console.error();
      },
      () => {
        this.load = true;
      }
    );
    this.nodes = [
      {
          key: '0',
          label: 'Team 1',
          children: [
              {key: '0-0', label: 'What is Angular', data:'https://angular.io', type: 'url' },
              {key: '0-1', label: 'Getting Started', data: 'https://angular.io/guide/setup-local', type: 'url'},
              {key: '0-2', label: 'Learn and Explore', data:'https://angular.io/guide/architecture', type: 'url'},
              {key: '0-3', label: 'Take a Look', data: 'https://angular.io/start', type: 'url'}
          ]
      },
      {
          key: '1',
          label: 'Components In-Depth',
          children: [
              {key: '1-0', label: 'Component Registration', data: 'https://angular.io/guide/component-interaction', type: 'url'},
              {key: '1-1', label: 'User Input', data: 'https://angular.io/guide/user-input', type: 'url'},
              {key: '1-2', label: 'Hooks', data: 'https://angular.io/guide/lifecycle-hooks', type: 'url'},
              {key: '1-3', label: 'Attribute Directives', data: 'https://angular.io/guide/attribute-directives', type: 'url'}
          ]
      }
  ];
  }

}