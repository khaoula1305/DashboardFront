import { Component, OnInit } from '@angular/core';
import {  GridsterItemComponentInterface, GridsterItem }  from 'angular-gridster2';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  static itemChange: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
  static itemResize: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;

  constructor() { }

  ngOnInit(): void {
  }

}
