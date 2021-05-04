import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from 'src/app/models/data-source.model';
import { DataSourceService } from 'src/app/services/data-source.service';
import { FormControl, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-configure-rest',
  templateUrl: './configure-rest.component.html',
  styleUrls: ['./configure-rest.component.scss']
})
export class ConfigureRestComponent implements OnInit {

  dataSource: DataSource= new DataSource();
  selectedKey: string;
  keys: string[];
  restResult: DataSource[];

  constructor(private dataSourceService: DataSourceService, private router: Router) { }

  ngOnInit(): void {
        
    this.dataSourceService.getAllDataSources().subscribe(
      (data) => {
        debugger
        this.restResult = data;
        console.log("restResult", this.restResult);
        this.keys[0]= this.restResult[0].metaDataSourceList[0].key;
        console.log("keys", this.keys);
      }
    );
  }

  onSelectedKey(){

  }

  onSubmit(rest: NgForm){

  }

}
