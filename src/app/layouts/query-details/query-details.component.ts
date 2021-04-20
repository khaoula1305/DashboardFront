import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../../services/data-source.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSource } from 'src/app/models/data-source.model';

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
  constructor(private route: ActivatedRoute, private dataSourceService: DataSourceService ) { }

   flat = (obj, out) => {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] == 'object') {
            out = this.flat(obj[key], out) //recursively call for nesteds
        } else {
            out[key] = obj[key] //direct assign for values
        }
    })
    return out
  }
  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.dataSourceService.getDataSource(id).subscribe(
      (result)=>{
        this.dataSource=result;
        this.dataSourceService.getDataFrom(result).subscribe(
          (data) => {
            data.forEach(el=>{
              this.results.push(this.flat(el,{}));
            });
            for (let key in this.results[0]) {
              this.cols.push( { field: key, header: key });
            }
          },
          (error) => {
            console.log(error);
            },
            () => {
           this.load=true;
            });
      }
    );

  }


}
