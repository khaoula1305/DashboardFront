import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  items: MenuItem[];


  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
      label: 'Home',
      icon:'pi pi-fw pi-home'
      },
      {
      label: 'Dashboards',
      icon:'pi pi-fw pi-chart-bar',
      items: [
          {
              label: 'My Dashbords',
              items: [
                  {
                  label: 'My first dash'
                  },
                  {
                  label: 'My second dash'
                  }
              ]
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
      },
      {
      label: 'REST',
      icon:'pi pi-fw pi-cloud-download'
      }
  ]
  }

}
