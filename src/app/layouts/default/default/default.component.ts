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

   add=false;
  constructor() { }

  ngOnInit(): void {
  }
  
  onHiddenClick(state){
  this.add = false;
  console.log('state hidden', state);
}

  addWidget(){
    this.add= true;
  }

}
