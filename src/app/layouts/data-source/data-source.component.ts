import { Component, OnInit } from '@angular/core';

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
    window.open("https://localhost:5001/swagger/index.html", "_blank");
  }

}
