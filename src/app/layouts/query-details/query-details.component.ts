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

  results: any[];
  cols: any[]=[];
  load= false;
  dataSource: DataSource;
  constructor(private route: ActivatedRoute, private dataSourceService: DataSourceService ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.dataSourceService.getDataSource(id).subscribe(
      (data)=>{
        this.dataSource=data;
        this.dataSourceService.getDataFrom(data).subscribe(
          (data) => {
            this.results= Object.assign({}, ...Object.values(data));
            console.log(data);
            for (let key in data[0]) {
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
