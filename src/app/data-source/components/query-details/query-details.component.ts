import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { DataSource } from '../../models/data-source.model';
import { DataSourceService } from '../../services/data-source.service';

@Component({
  selector: 'app-query-details',
  templateUrl: './query-details.component.html',
  styleUrls: ['./query-details.component.scss']
})

export class QueryDetailsComponent implements OnInit {

  results: any[]=[];
  cols: any[]=[];
  load= false;
  dataSource: DataSource;
  customTable:any;

  constructor(private route: ActivatedRoute, private dataSourceService: DataSourceService ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.dataSourceService.getDataSource(id).subscribe(
      (result)=>{
        this.dataSource=result;
        this.dataSourceService.getDataFrom(result).subscribe(
          (data) => {
            //show only simple elements => no tables ; no objects
            this.results=data.filter(elm => !( Array.isArray(elm) && typeof elm == Constants.object));
           for (let key in this.results[0]) {
            this.cols.push( { field: key, header: key });
          }
          this.customTable=[];
          this.cols.forEach(elm=>{
            this.customTable.push(elm.header);
          });
          },
          (error) => {
            },
            () => {
           this.load=true;
            });
      }
    );
  }
}
