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
   flatToString(obj, out){
    if(Array.isArray(obj)){
      out+= ' [';
      obj.forEach(element => {
        out+=this.flatToString(element, out);
      });
     out+= '] ';
    }
    else if (typeof obj == 'object') {
         out+=' {' ;
         Object.keys(obj).forEach(key => {
           out+='\"'+key+"\":"+obj[key]+", ";
         })
         out+= "} , ";
     }
     return out;
   }
   flat = (obj, out) => {
    Object.keys(obj).forEach(key => {
      if( obj[key] !== null && (Array.isArray(obj[key]) || typeof obj[key] == 'object')){
        out[key] = this.flatToString(obj[key], '');
      }
       else {
           out[key] = obj[key]
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
            data.forEach(elm => {
              this.results.push(this.flat(elm,{}));
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
