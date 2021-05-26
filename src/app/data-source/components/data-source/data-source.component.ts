import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-data-source',
  templateUrl: './data-source.component.html',
  styleUrls: ['./data-source.component.scss']
})
export class DataSourceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  goToQueryBuilder(){
    window.open(Constants.queryBuilderURL, '_blank');
  }

}
