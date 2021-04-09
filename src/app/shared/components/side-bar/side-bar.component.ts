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
  myItems: MenuItem[] = [];


  constructor(private dashboardService: DashboardsService, private router: Router, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDashboards();
    const test = 'dash';
    this.items = [
      {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: '/'
      },
      {
      label: 'Dashboards',
      icon: 'pi pi-fw pi-chart-bar',
      items: [
        {
          label: 'New Dashboard',
          icon: 'pi pi-fw pi-plus-circle',
          routerLink: '/NewDashboard'
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
        label: 'Data Sources',
        icon: 'pi pi-fw pi-cloud-download',
        routerLink: 'dataSource'
        },
      {
      label: 'Queries',
      icon: 'pi pi-fw pi-sliders-h',
      routerLink: 'queries'
      },
      {
      label: 'My Widgets',
      icon: 'pi pi-fw pi-calendar',
      routerLink: 'myWidgets'
      }
  ];
  }

  getDashboards(){
    this.dashboardService.getAllDashboards().subscribe(
      (response) => {
        response.forEach( elm => {
        this.myItems.push({label: elm.title, command: (event) => {
          response.find(e=> e.title==event.item.label);
          // event.originalEvent: Browser event
          // event.item: menuitem metadata
          // let title = this.activatedroute.snapshot.paramMap.get("event.item.title");
          this.router.navigate(['dashboards', event.item.label]);
          // this.router.navigate(["dashboards", title], event.item.title);
      }});
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
