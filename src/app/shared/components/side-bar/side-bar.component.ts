import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { Dashboard } from 'src/app/models/dashboard.model';
import { DashboardsService } from 'src/app/services/dashboards.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  items: MenuItem[];
  dashboards: Dashboard[];
  myLabel: string;
  myItems:MenuItem[]=[];


  constructor(private dashboardService: DashboardsService, private router: Router, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDashboards();
    let test:string="dash";
    this.items = [
      {
      label: 'Home',
      icon:'pi pi-fw pi-home',
      routerLink: "home"
      },
      {
      label: 'Dashboards',
      icon:'pi pi-fw pi-chart-bar',
      items: [
        {
          label: 'New Dashboard',
          icon:'pi pi-fw pi-plus-circle',
          //routerLink: "/"
        },
          {
              label: 'My Dashbords',
              // show all user dashboards 
              items: this.myItems
          },
          {
              label: 'Shared With Me',
              items: [
                  {
                  label: 'Marketing Dash'
                  },
                  {
                  label: 'Finance Dash'
                  }
              ]
          }
      ]
      },
      {
      label: 'Queries',
      icon:'pi pi-fw pi-sliders-h',
      routerLink: "queries"
      },
      {
      label: 'REST',
      icon:'pi pi-fw pi-cloud-download',
      routerLink: "rest"
      }
  ]
  }

  getDashboards(){
    this.dashboardService.getAllDashboards().subscribe(
      (response) => {
        console.log('all dashboards ', response);
        this.dashboards = response;
        this.dashboards.forEach( elm => {
        this.myItems.push({'label': elm.title, command: (event) => {
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
          console.log(event.item.title);
          console.log(event.item.label);
          //let title = this.activatedroute.snapshot.paramMap.get("event.item.title");
          this.router.navigate(["dashboards", event.item.label]);
          //this.router.navigate(["dashboards", title], event.item.title);
          
      }});
        console.log(this.myItems);
        });
      },
      (error) => {
        console.log('error ');
      },
      () => {
        console.log('complete');
      }
    );
  }

}
