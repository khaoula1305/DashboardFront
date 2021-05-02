import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import { DashboardsService } from 'src/app/services/dashboards.service';
import {Dashboard} from 'src/app/models/dashboard.model';
import { TeamsService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';
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
    private dashboardService : DashboardsService,
    private teamService: TeamsService) { }

  ngOnInit(): void {
    this.nodes = [];
    this.teamService.getAllTeams().subscribe(
      (data)=>{
        let iteration=0;
        data.forEach(element => {
          let object : TreeNode= { key: ''+iteration, label: element.title, children: []};
          this.teamService.getAllDashboards(element.id).subscribe(
            (dashs) => {
              let iteration2=0;
              dashs.forEach(elem=>{
                object.children.push({key:iteration+'-'+iteration2, label: elem.title, data:'/dashboards/'+elem.id, type: 'url', icon:"pi pi-fw pi-chart-bar", droppable:true });
              });
              iteration2++;
            }
          );
          this.nodes.push(object);
        });
      },
      (error) => {
        console.error();
      },
      () => {
        this.load = true;
      }
      );
  }

}
