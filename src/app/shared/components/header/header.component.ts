import { Component, OnInit } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  constructor() { }



  ngOnInit(): void {
    this.items = [
      {
          label: 'User Name',
          items: [
              {
                  label: 'New',
                  icon: 'pi pi-fw pi-user-plus',

              },
              {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-user-minus',

              },
              {
                  label: 'Search',
                  icon: 'pi pi-fw pi-users'
              }
          ]
      }
  ];
  }

}
